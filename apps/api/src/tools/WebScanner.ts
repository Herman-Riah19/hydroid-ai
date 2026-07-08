import {
  HeaderAnalyzer,
  CookieAnalyzer,
  CorsAnalyzer,
  SslAnalyzer,
} from "@hydroid/scanner-web";
import { SQLInjectionScanner } from "@hydroid/scanner-sqli";
import { XssScanner } from "@hydroid/scanner-xss";
import { HttpClient, computeSummary } from "@hydroid/security-core";
import type {
  ScanTarget,
  ScanResult,
  Vulnerability,
  ScannerConfig,
  BaseScanner,
} from "@hydroid/security-core";

import { Logger } from "@tsed/logger";

export type ScanEventCallback = (event: {
  type: string;
  message: string;
  data?: unknown;
}) => void;

export interface SecurityScanOptions {
  url: string;
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: string;
  scanModules?: Array<"headers" | "cookies" | "cors" | "ssl" | "sqli" | "xss">;
  onEvent?: ScanEventCallback;
}

const SCANNER_LABELS: Record<string, string> = {
  headers: "En-têtes de sécurité",
  cookies: "Analyse des cookies",
  cors: "Configuration CORS",
  ssl: "SSL/TLS",
  sqli: "Injection SQL",
  xss: "Cross-Site Scripting (XSS)",
};

export class WebScanner {
  readonly name = "WebScanner";
  readonly version = "1.0.0";

  private scanners: Map<string, BaseScanner>;
  private http: HttpClient;
  private logger: Logger;
  private initialized = false;
  private config: ScannerConfig;

  constructor(config: ScannerConfig = {}) {
    this.config = config;
    this.scanners = new Map();
    this.http = new HttpClient(config);
    this.logger = new Logger("WebScanner");
  }

  async initialize(): Promise<void> {
    this.scanners.set("headers", new HeaderAnalyzer());
    this.scanners.set("cookies", new CookieAnalyzer());
    this.scanners.set("cors", new CorsAnalyzer());
    this.scanners.set("ssl", new SslAnalyzer());
    this.scanners.set("sqli", new SQLInjectionScanner());
    this.scanners.set("xss", new XssScanner());
    this.initialized = true;
  }

  async dispose(): Promise<void> {
    this.scanners.clear();
    this.initialized = false;
  }

  private ensureInitialized(): void {
    if (!this.initialized)
      throw new Error("WebScanner not initialized. Call initialize() first.");
  }

  async scan(options: SecurityScanOptions): Promise<ScanResult> {
    this.ensureInitialized();

    const startTime = new Date().toISOString();
    const allVulns: Vulnerability[] = [];

    const target: ScanTarget = {
      url: options.url,
      method: options.method ?? "GET",
      headers: options.headers,
      body: options.body,
    };

    const modules = options.scanModules ?? [
      "headers",
      "cookies",
      "cors",
      "ssl",
      "sqli",
      "xss",
    ];

    options.onEvent?.({
      type: "init",
      message: `Démarrage du scan de sécurité pour: ${options.url}`,
    });
    options.onEvent?.({
      type: "info",
      message: `${modules.length} modules de scan configurés`,
    });

    for (const moduleName of modules) {
      const scanner = this.scanners.get(moduleName);
      if (!scanner) {
        this.logger.warn(`Unknown scan module: ${moduleName}`);
        continue;
      }

      const label = SCANNER_LABELS[moduleName] ?? moduleName;
      options.onEvent?.({
        type: "scan-start",
        message: `Scan du module: ${label}...`,
        data: { module: moduleName },
      });

      try {
        const vulns = await scanner.scan(target, this.config);
        allVulns.push(...vulns);

        if (vulns.length === 0) {
          options.onEvent?.({
            type: "scan-ok",
            message: `✓ ${label}: Aucune vulnérabilité détectée`,
          });
        } else {
          const crit = vulns.filter(
            (v) => v.severity === "critical" || v.severity === "high",
          ).length;
          options.onEvent?.({
            type: "scan-vulns",
            message: `⚠ ${label}: ${vulns.length} vulnérabilité(s) trouvée(s) dont ${crit} critique(s)`,
            data: { module: moduleName, count: vulns.length, critical: crit },
          });
        }
      } catch (error) {
        const errMsg =
          error instanceof Error ? error.message : "Erreur inconnue";
        options.onEvent?.({
          type: "scan-error",
          message: `✗ ${label}: Erreur - ${errMsg}`,
        });
        this.logger.error(`Scanner ${moduleName} failed:`, error);
      }
    }

    let httpResponse;
    try {
      options.onEvent?.({
        type: "info",
        message: "Récupération des en-têtes HTTP...",
      });
      httpResponse = await this.http.request(options.url);
      options.onEvent?.({
        type: "info",
        message: `✓ Réponse HTTP: ${httpResponse.statusCode}`,
      });
    } catch {
      httpResponse = undefined;
    }

    const summary = computeSummary(allVulns);
    const endTime = new Date().toISOString();

    options.onEvent?.({
      type: "complete",
      message: "Scan terminé",
      data: { summary },
    });

    return {
      target,
      status: "completed",
      startTime,
      endTime,
      vulnerabilities: allVulns,
      summary,
      responses: httpResponse ? [httpResponse] : [],
    };
  }

  async scanAll(urls: string[]): Promise<ScanResult[]> {
    const results: ScanResult[] = [];
    for (const url of urls) {
      try {
        const result = await this.scan({ url });
        results.push(result);
      } catch (error) {
        this.logger.error(`Scan failed for ${url}:`, error);
      }
    }
    return results;
  }
}

export function createWebScanner(config?: ScannerConfig): WebScanner {
  return new WebScanner(config);
}
