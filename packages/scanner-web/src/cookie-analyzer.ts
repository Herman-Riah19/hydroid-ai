import type {
  Vulnerability,
  ScanTarget,
  ScannerConfig,
  BaseScanner,
} from "@hydroid/security-core";
import { createVulnerabilityId } from "@hydroid/security-core";
import { HttpClient } from "@hydroid/security-core";

export class CookieAnalyzer implements BaseScanner {
  readonly name = "CookieAnalyzer";
  readonly description = "Analyzes cookie security attributes";

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

    const setCookieHeader = response.headers["set-cookie"];
    if (!setCookieHeader) return [];

    const cookies = Array.isArray(setCookieHeader)
      ? setCookieHeader
      : [setCookieHeader];

    for (const cookie of cookies) {
      const name = cookie.split("=")[0] ?? "unknown";

      if (!cookie.toLowerCase().includes("secure")) {
        vulns.push({
          id: createVulnerabilityId(),
          name: "Cookie Missing Secure Flag",
          description: `Cookie "${name}" is missing the Secure flag and may be sent over unencrypted connections.`,
          severity: "high",
          category: "cookie-security",
          location: `Set-Cookie: ${name}`,
          remediation: "Add the 'Secure' flag to cookies.",
          evidence: cookie,
        });
      }

      if (!cookie.toLowerCase().includes("httponly")) {
        vulns.push({
          id: createVulnerabilityId(),
          name: "Cookie Missing HttpOnly Flag",
          description: `Cookie "${name}" is missing the HttpOnly flag and can be accessed by JavaScript.`,
          severity: "medium",
          category: "cookie-security",
          location: `Set-Cookie: ${name}`,
          remediation:
            "Add the 'HttpOnly' flag to cookies that don't need client-side access.",
          evidence: cookie,
        });
      }

      if (!cookie.toLowerCase().includes("samesite")) {
        vulns.push({
          id: createVulnerabilityId(),
          name: "Cookie Missing SameSite Attribute",
          description: `Cookie "${name}" is missing the SameSite attribute, making it vulnerable to CSRF.`,
          severity: "medium",
          category: "cookie-security",
          location: `Set-Cookie: ${name}`,
          remediation: "Add 'SameSite=Lax' or 'SameSite=Strict' to cookies.",
          evidence: cookie,
        });
      }
    }

    return vulns;
  }
}
