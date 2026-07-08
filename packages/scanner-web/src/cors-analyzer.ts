import type {
  Vulnerability,
  ScanTarget,
  ScannerConfig,
  BaseScanner,
} from "@hydroid/security-core";
import { createVulnerabilityId } from "@hydroid/security-core";
import { HttpClient } from "@hydroid/security-core";

export class CorsAnalyzer implements BaseScanner {
  readonly name = "CorsAnalyzer";
  readonly description = "Analyzes CORS misconfigurations";

  private http: HttpClient;

  constructor() {
    this.http = new HttpClient();
  }

  async scan(
    target: ScanTarget,
    config?: ScannerConfig,
  ): Promise<Vulnerability[]> {
    const vulns: Vulnerability[] = [];

    const { response } = await this.http.requestRaw(target.url, {
      headers: { Origin: "https://evil.com" },
    });

    const acao = response.headers["access-control-allow-origin"];
    const acac = response.headers["access-control-allow-credentials"];

    if (!acao) return vulns;

    if (acao === "*") {
      vulns.push({
        id: createVulnerabilityId(),
        name: "CORS Wildcard Origin",
        description:
          "Server allows all origins with '*' wildcard. Any website can make cross-origin requests.",
        severity: "high",
        category: "cors",
        location: "Header: Access-Control-Allow-Origin",
        remediation:
          "Restrict Access-Control-Allow-Origin to specific trusted origins.",
        evidence: "Access-Control-Allow-Origin: *",
      });

      if (acac === "true") {
        vulns.push({
          id: createVulnerabilityId(),
          name: "CORS Wildcard with Credentials",
          description:
            "Server allows wildcard origin with credentials. This is a critical misconfiguration.",
          severity: "critical",
          category: "cors",
          location:
            "Headers: Access-Control-Allow-Origin + Access-Control-Allow-Credentials",
          remediation:
            "Remove credentials support or restrict to specific origins.",
          evidence:
            "Access-Control-Allow-Origin: * with Access-Control-Allow-Credentials: true",
        });
      }
    }

    if (acao === "https://evil.com") {
      vulns.push({
        id: createVulnerabilityId(),
        name: "CORS Origin Reflection",
        description:
          "Server reflects the Origin header value in Access-Control-Allow-Origin. Any site can make authenticated requests.",
        severity: "critical",
        category: "cors",
        location: "Header: Access-Control-Allow-Origin",
        remediation:
          "Use a whitelist of allowed origins instead of reflecting the Origin header.",
        evidence: `Access-Control-Allow-Origin: ${acao} (reflected from request Origin header)`,
      });
    }

    return vulns;
  }
}
