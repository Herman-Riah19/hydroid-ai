import type {
  Vulnerability,
  ScanTarget,
  ScannerConfig,
  BaseScanner,
} from "@hydroid/security-core";
import { createVulnerabilityId } from "@hydroid/security-core";
import { HttpClient } from "@hydroid/security-core";

export class SslAnalyzer implements BaseScanner {
  readonly name = "SslAnalyzer";
  readonly description = "Analyzes SSL/TLS configuration";

  private http: HttpClient;

  constructor() {
    this.http = new HttpClient();
  }

  async scan(
    target: ScanTarget,
    config?: ScannerConfig,
  ): Promise<Vulnerability[]> {
    const vulns: Vulnerability[] = [];

    if (!target.url.startsWith("https")) {
      vulns.push({
        id: createVulnerabilityId(),
        name: "Non-HTTPS Connection",
        description:
          "The target URL uses HTTP instead of HTTPS. Data is transmitted in plaintext.",
        severity: "critical",
        category: "ssl-tls",
        location: target.url,
        remediation:
          "Configure TLS/SSL and redirect all HTTP traffic to HTTPS.",
        evidence: `URL uses http:// instead of https://`,
      });
      return vulns;
    }

    const { response } = await this.http.requestRaw(target.url);
    const hsts = response.headers["strict-transport-security"];

    if (!hsts) {
      vulns.push({
        id: createVulnerabilityId(),
        name: "Missing HSTS on HTTPS",
        description:
          "HTTPS site without HSTS header. Users are vulnerable to SSL stripping attacks on first visit.",
        severity: "high",
        category: "ssl-tls",
        location: "Header: Strict-Transport-Security",
        remediation:
          "Add 'Strict-Transport-Security: max-age=31536000; includeSubDomains' header.",
        evidence: "HSTS header not found on HTTPS response",
      });
    } else {
      const maxAgeMatch = hsts.match(/max-age=(\d+)/);
      if (maxAgeMatch) {
        const maxAge = parseInt(maxAgeMatch[1] ?? "0", 10);
        if (maxAge < 31536000) {
          vulns.push({
            id: createVulnerabilityId(),
            name: "Low HSTS max-age",
            description: `HSTS max-age is ${maxAge}s (recommended: 31536000s / 1 year).`,
            severity: "low",
            category: "ssl-tls",
            location: "Header: Strict-Transport-Security",
            remediation: "Set max-age to at least 31536000 seconds.",
            evidence: `max-age=${maxAge}`,
          });
        }
      }
    }

    return vulns;
  }
}
