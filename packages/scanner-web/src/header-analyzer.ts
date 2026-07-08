import type {
  Vulnerability,
  ScanTarget,
  ScannerConfig,
  BaseScanner,
} from "@hydroid/security-core";
import { createVulnerabilityId } from "@hydroid/security-core";
import { HttpClient } from "@hydroid/security-core";

export class HeaderAnalyzer implements BaseScanner {
  readonly name = "HeaderAnalyzer";
  readonly description = "Analyzes HTTP security headers";

  private http: HttpClient;

  constructor() {
    this.http = new HttpClient();
  }

  async scan(
    target: ScanTarget,
    config?: ScannerConfig,
  ): Promise<Vulnerability[]> {
    const vulns: Vulnerability[] = [];
    const { response } = await this.http.requestRaw(target.url);

    const headers = response.headers;

    const securityHeaders: Record<
      string,
      {
        name: string;
        desc: string;
        remediation: string;
        severity: "high" | "medium" | "low" | "info";
      }
    > = {
      "strict-transport-security": {
        name: "Strict-Transport-Security (HSTS)",
        desc: "HSTS header is missing. This allows downgrade attacks.",
        remediation:
          "Add 'Strict-Transport-Security: max-age=31536000; includeSubDomains' header.",
        severity: "medium",
      },
      "content-security-policy": {
        name: "Content-Security-Policy (CSP)",
        desc: "CSP header is missing. This increases risk of XSS and data injection attacks.",
        remediation:
          "Implement a Content-Security-Policy header to control resources the browser can load.",
        severity: "high",
      },
      "x-frame-options": {
        name: "X-Frame-Options",
        desc: "X-Frame-Options header is missing. The site may be vulnerable to clickjacking.",
        remediation: "Add 'X-Frame-Options: DENY' or 'SAMEORIGIN' header.",
        severity: "medium",
      },
      "x-content-type-options": {
        name: "X-Content-Type-Options",
        desc: "X-Content-Type-Options header is missing. Browser may perform MIME sniffing.",
        remediation: "Add 'X-Content-Type-Options: nosniff' header.",
        severity: "low",
      },
      "referrer-policy": {
        name: "Referrer-Policy",
        desc: "Referrer-Policy header is missing. Referrer information may be leaked.",
        remediation:
          "Add 'Referrer-Policy: strict-origin-when-cross-origin' header.",
        severity: "low",
      },
      "permissions-policy": {
        name: "Permissions-Policy",
        desc: "Permissions-Policy header is missing. Browser features are uncontrolled.",
        remediation:
          "Add a Permissions-Policy header to restrict feature access.",
        severity: "low",
      },
      "x-xss-protection": {
        name: "X-XSS-Protection",
        desc: "X-XSS-Protection header is missing or disabled.",
        remediation:
          "While deprecated in modern browsers, set 'X-XSS-Protection: 1; mode=block' for legacy support.",
        severity: "info",
      },
    };

    for (const [headerKey, info] of Object.entries(securityHeaders)) {
      if (!headers[headerKey]) {
        vulns.push({
          id: createVulnerabilityId(),
          name: info.name,
          description: info.desc,
          severity: info.severity,
          category: "security-headers",
          location: `Header: ${headerKey}`,
          remediation: info.remediation,
          evidence: `Header '${headerKey}' not found in response`,
        });
      }
    }

    const serverHeader = headers["server"];
    if (serverHeader) {
      vulns.push({
        id: createVulnerabilityId(),
        name: "Server Information Disclosure",
        description: `The server header reveals: "${serverHeader}". Attackers can use this to target known vulnerabilities.`,
        severity: "low",
        category: "information-disclosure",
        location: "Header: server",
        remediation:
          "Remove or obfuscate the Server header in your web server configuration.",
        evidence: `Server: ${serverHeader}`,
      });
    }

    const poweredBy = headers["x-powered-by"];
    if (poweredBy) {
      vulns.push({
        id: createVulnerabilityId(),
        name: "X-Powered-By Information Disclosure",
        description: `The X-Powered-By header reveals: "${poweredBy}". This exposes technology stack information.`,
        severity: "low",
        category: "information-disclosure",
        location: "Header: x-powered-by",
        remediation: "Remove or disable the X-Powered-By header.",
        evidence: `X-Powered-By: ${poweredBy}`,
      });
    }

    return vulns;
  }
}
