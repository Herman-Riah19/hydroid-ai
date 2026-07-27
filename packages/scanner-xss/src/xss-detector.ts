import type {
  Vulnerability,
  ScanTarget,
  ScannerConfig,
  BaseScanner,
} from "@hydroid/security-core";
import {
  createVulnerabilityId,
  runWithConcurrency,
} from "@hydroid/security-core";
import { HttpClient } from "@hydroid/security-core";
import { XSS_PAYLOADS } from "./payloads.js";

export class XssScanner implements BaseScanner {
  readonly name = "XssScanner";
  readonly description = "Detects Cross-Site Scripting (XSS) vulnerabilities";

  private http: HttpClient;

  constructor() {
    this.http = new HttpClient();
  }

  async scan(
    target: ScanTarget,
    config?: ScannerConfig,
  ): Promise<Vulnerability[]> {
    const baseUrl = target.url.split("?")[0] ?? target.url;
    const param = this.guessParam(target.url) || "q";
    const concurrency = config?.concurrentRequests ?? 10;

    const tasks: (() => Promise<Vulnerability | null>)[] = XSS_PAYLOADS.map(
      (xss) => async () => {
        const testUrl = `${baseUrl}?${param}=${encodeURIComponent(xss.payload)}`;
        try {
          const { response, body } = await this.http.requestRaw(testUrl);
          if (xss.type === "reflected") {
            return this.checkReflected(body, xss, param, testUrl);
          }
          return null;
        } catch {
          return null;
        }
      },
    );

    const results = await runWithConcurrency(tasks, concurrency);
    return this.deduplicate(
      results.filter((v): v is Vulnerability => v !== null),
    );
  }

  private guessParam(url: string): string | null {
    const queryStart = url.indexOf("?");
    if (queryStart === -1) return null;
    const params = url.slice(queryStart + 1).split("&");
    const firstParam = params[0]?.split("=")[0];
    return firstParam ?? null;
  }

  private checkReflected(
    body: string,
    xss: (typeof XSS_PAYLOADS)[number],
    param: string,
    testUrl: string,
  ): Vulnerability | null {
    for (const marker of xss.detectionMarkers) {
      if (body.includes(marker)) {
        const severity = xss.type === "dom" ? "high" : "critical";
        return {
          id: createVulnerabilityId(),
          name: `XSS (${xss.name})`,
          description: `Cross-Site Scripting vulnerability detected via parameter "${param}" using ${xss.name} technique.`,
          severity: severity as "critical" | "high",
          category: "xss",
          location: `Parameter: ${param}`,
          evidence: `Payload reflected in response body: "${marker}"`,
          remediation:
            "Properly encode all user-supplied data. Use Content-Security-Policy headers. Validate and sanitize inputs.",
          payload: xss.payload,
        };
      }
    }
    return null;
  }

  private deduplicate(vulns: Vulnerability[]): Vulnerability[] {
    const seen = new Set<string>();
    return vulns.filter((v) => {
      const key = `${v.category}-${v.name}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}
