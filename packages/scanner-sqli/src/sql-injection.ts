import type {
  Vulnerability,
  ScanTarget,
  ScannerConfig,
  BaseScanner,
} from "@hydroid/security-core";
import { createVulnerabilityId } from "@hydroid/security-core";
import { HttpClient } from "@hydroid/security-core";
import { SQLI_PAYLOADS, SQLI_PARAMS } from "./payloads.js";

export class SQLInjectionScanner implements BaseScanner {
  readonly name = "SQLInjectionScanner";
  readonly description =
    "Detects SQL injection vulnerabilities using multiple techniques";

  private http: HttpClient;

  constructor() {
    this.http = new HttpClient();
  }

  async scan(
    target: ScanTarget,
    config?: ScannerConfig,
  ): Promise<Vulnerability[]> {
    const vulns: Vulnerability[] = [];

    const baseUrl = target.url.split("?")[0] ?? target.url;
    const existingParams = this.parseParams(target.url);

    for (const param of SQLI_PARAMS) {
      if (existingParams.length > 0 && !existingParams.includes(param))
        continue;

      for (const sqli of SQLI_PAYLOADS) {
        const testUrl = this.buildTestUrl(
          baseUrl,
          param,
          sqli.payload,
          existingParams,
        );
        try {
          const { response, body } = await this.http.requestRaw(testUrl, {
            headers: { ...target.headers },
          });

          const vuln = await this.analyzeResponse(
            body,
            response.statusCode,
            sqli,
            param,
            testUrl,
            target.url,
          );
          if (vuln) vulns.push(vuln);
        } catch {
          continue;
        }
      }
    }

    return this.deduplicate(vulns);
  }

  private parseParams(url: string): string[] {
    const queryStart = url.indexOf("?");
    if (queryStart === -1) return [];
    const query = url.slice(queryStart + 1);
    return query
      .split("&")
      .map((p) => p.split("=")[0] ?? "")
      .filter(Boolean);
  }

  private buildTestUrl(
    baseUrl: string,
    param: string,
    payload: string,
    existingParams: string[],
  ): string {
    if (existingParams.length > 0) {
      const params = existingParams.map((p) =>
        p === param ? `${p}=${encodeURIComponent(payload)}` : `${p}=1`,
      );
      return `${baseUrl}?${params.join("&")}`;
    }
    return `${baseUrl}?${param}=${encodeURIComponent(payload)}`;
  }

  private async analyzeResponse(
    body: string,
    statusCode: number,
    sqli: (typeof SQLI_PAYLOADS)[number],
    param: string,
    testUrl: string,
    originalUrl: string,
  ): Promise<Vulnerability | null> {
    if (sqli.technique === "error-based") {
      for (const pattern of sqli.errorPatterns) {
        if (pattern.test(body)) {
          return {
            id: createVulnerabilityId(),
            name: `SQL Injection (Error-based) - ${sqli.name}`,
            description: `SQL injection detected via parameter "${param}" with error-based technique.`,
            severity: "critical",
            category: "sql-injection",
            location: `Parameter: ${param}`,
            evidence: `Pattern '${pattern.source}' matched in response body`,
            remediation:
              "Use parameterized queries / prepared statements. Validate and sanitize all user inputs.",
            payload: sqli.payload,
          };
        }
      }
    }

    if (
      sqli.technique === "time-based" &&
      sqli.timeDelay &&
      sqli.timeDelay > 0
    ) {
      const testStart = performance.now();
      try {
        const { response: timeResponse } = await this.http.requestRaw(testUrl);
        const elapsed = performance.now() - testStart;
        if (
          elapsed >= sqli.timeDelay * 1000 * 0.8 &&
          timeResponse.statusCode === statusCode
        ) {
          return {
            id: createVulnerabilityId(),
            name: `SQL Injection (Time-based) - ${sqli.name}`,
            description: `Time-based SQL injection detected via parameter "${param}". Response took ${Math.round(elapsed)}ms.`,
            severity: "critical",
            category: "sql-injection",
            location: `Parameter: ${param}`,
            evidence: `Expected delay: ${sqli.timeDelay}s, actual: ${Math.round(elapsed / 1000)}s`,
            remediation:
              "Use parameterized queries. Ensure database error messages are not exposed.",
            payload: sqli.payload,
          };
        }
      } catch {
        // timeout errors may also indicate time-based injection
      }
    }

    if (sqli.technique === "union-based") {
      const errorPatterns = [
        /column number/i,
        /has n columns/i,
        /unions/i,
        /SELECT.*FROM/i,
        /SQL syntax.*select/i,
        /Unknown column/i,
      ];
      for (const pattern of errorPatterns) {
        if (pattern.test(body)) {
          return {
            id: createVulnerabilityId(),
            name: `SQL Injection (Union-based) - ${sqli.name}`,
            description: `Union-based SQL injection probe on parameter "${param}". The query structure may be exploitable.`,
            severity: "high",
            category: "sql-injection",
            location: `Parameter: ${param}`,
            evidence: `Response indicates column count mismatch via pattern '${pattern.source}'`,
            remediation:
              "Use parameterized queries and apply least privilege to database accounts.",
            payload: sqli.payload,
          };
        }
      }
    }

    return null;
  }

  private deduplicate(vulns: Vulnerability[]): Vulnerability[] {
    const seen = new Set<string>();
    return vulns.filter((v) => {
      const key = `${v.category}-${v.location}-${v.name}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}
