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
  AiAnalysis,
} from "@hydroid/security-core";

import { Logger } from "@tsed/logger";
import type { ILLMSkill } from "src/types/LLMType.js";

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

function buildVulnSummaryForLLM(vulns: Vulnerability[]): string {
  if (vulns.length === 0) return "Aucune vulnérabilité détectée.";

  const bySev = {
    critical: vulns.filter((v) => v.severity === "critical"),
    high: vulns.filter((v) => v.severity === "high"),
    medium: vulns.filter((v) => v.severity === "medium"),
    low: vulns.filter((v) => v.severity === "low"),
    info: vulns.filter((v) => v.severity === "info"),
  };

  const lines: string[] = [];
  for (const [sev, items] of Object.entries(bySev)) {
    if (items.length === 0) continue;
    lines.push(`\n[${sev.toUpperCase()}] (${items.length})`);
    for (const v of items) {
      lines.push(`  - ${v.name} [${v.category}]`);
      if (v.location) lines.push(`    Location: ${v.location}`);
      if (v.evidence) lines.push(`    Evidence: ${v.evidence}`);
    }
  }
  return lines.join("\n");
}

export class WebScanner {
  readonly name = "WebScanner";
  readonly version = "1.0.0";

  private scanners: Map<string, BaseScanner>;
  private http: HttpClient;
  private logger: Logger;
  private initialized = false;
  private config: ScannerConfig;
  private llm: ILLMSkill | null = null;

  constructor(config: ScannerConfig = {}) {
    this.config = config;
    this.scanners = new Map();
    this.http = new HttpClient(config);
    this.logger = new Logger("WebScanner");
  }

  setLLM(llm: ILLMSkill): void {
    this.llm = llm;
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

    const validModules = modules.filter((name) => {
      if (!this.scanners.has(name)) {
        this.logger.warn(`Unknown scan module: ${name}`);
        return false;
      }
      return true;
    });

    this.logger.info(`${validModules.length} modules de scan configurés`);
    options.onEvent?.({
      type: "info",
      message: `${validModules.length} modules de scan configurés — exécution séquentielle`,
    });

    const allVulns: Vulnerability[] = [];

    for (const moduleName of validModules) {
      const scanner = this.scanners.get(moduleName)!;
      const label = SCANNER_LABELS[moduleName] ?? moduleName;

     
      options.onEvent?.({
        type: "scan-start",
        message: `Lancement du module : ${label}...`,
        data: { module: moduleName },
      });

      try {
        
        const vulns = await scanner.scan(target, this.config);
        allVulns.push(...vulns);

        // 3. Émission immédiate du résultat dès la fin de ce module
        if (vulns.length === 0) {
          options.onEvent?.({
            type: "scan-ok",
            message: `✓ ${label}: Aucune vulnérabilité détectée`,
            data: { module: moduleName },
          });
        } else {
          const crit = vulns.filter(
            (v) => v.severity === "critical" || v.severity === "high",
          ).length;

          options.onEvent?.({
            type: "scan-vulns",
            message: `⚠ ${label}: ${vulns.length} vulnérabilité(s) trouvée(s) dont ${crit} critique(s)`,
            data: {
              module: moduleName,
              count: vulns.length,
              critical: crit,
            },
          });
        }
        
      } catch (error) {
        const errMsg =
          error instanceof Error ? error.message : "Erreur inconnue";
        this.logger.error(`Scanner ${moduleName} failed:`, error);

        options.onEvent?.({
          type: "scan-error",
          message: `✗ ${label}: Erreur - ${errMsg}`,
          data: { module: moduleName, error: errMsg },
        });
      }
    }

    // Récupération des en-têtes HTTP de la cible
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

    // Analyse IA facultative si des vulnérabilités ont été détectées
    let aiAnalysis: AiAnalysis | undefined;
    if (this.llm && allVulns.length > 0) {
      options.onEvent?.({
        type: "info",
        message: "Analyse IA en cours...",
      });

      try {
        aiAnalysis = await this.runLLMAnalysis(allVulns, options.url);
        options.onEvent?.({
          type: "info",
          message: "✓ Analyse IA terminée avec succès",
        });
      } catch (error) {
        const errMsg =
          error instanceof Error ? error.message : "Erreur inconnue";
        this.logger.error("LLM analysis failed:", error);
        options.onEvent?.({
          type: "scan-error",
          message: `✗ Analyse IA échouée: ${errMsg}`,
        });
      }
    }

    const endTime = new Date().toISOString();

    return {
      target,
      status: "completed",
      startTime,
      endTime,
      vulnerabilities: allVulns,
      summary,
      responses: httpResponse ? [httpResponse] : [],
      aiAnalysis,
    };
  }

  private async runLLMAnalysis(
    vulns: Vulnerability[],
    targetUrl: string,
  ): Promise<AiAnalysis> {
    const vulnSummary = buildVulnSummaryForLLM(vulns);

    const prompt = `Tu es un expert en cybersécurité. Analyse les vulnérabilités suivantes détectées sur ${targetUrl} et fournis:

1. **riskSummary**: Un résumé en 2-3 phrases du niveau de risque global
2. **recommendations**: Liste des recommandations de remédiation (une par ligne, commence par "- ")
3. **attackVectors**: Liste des vecteurs d'attaque possibles (une par ligne, commence par "- ")
4. **priorityActions**: Liste des actions prioritaires à entreprendre (une par ligne, commence par "- ")

Vulnérabilités détectées:
${vulnSummary}

Réponds UNIQUEMENT avec un objet JSON valide avec ces 4 clés (riskSummary: string, recommendations: string[], attackVectors: string[], priorityActions: string[]). Pas de markdown, pas de commentaire.`;

    const result = await this.llm!.generate(prompt);

    try {
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as Record<string, unknown>;
        return {
          riskSummary: String(parsed.riskSummary ?? ""),
          recommendations: Array.isArray(parsed.recommendations)
            ? (parsed.recommendations as string[])
            : [],
          attackVectors: Array.isArray(parsed.attackVectors)
            ? (parsed.attackVectors as string[])
            : [],
          priorityActions: Array.isArray(parsed.priorityActions)
            ? (parsed.priorityActions as string[])
            : [],
        };
      }
    } catch {
      this.logger.error("Failed to parse LLM JSON response");
    }

    return {
      riskSummary: result,
      recommendations: [],
      attackVectors: [],
      priorityActions: [],
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