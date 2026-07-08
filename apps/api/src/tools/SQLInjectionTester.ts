import { SQLInjectionScanner } from "@hydroid/scanner-sqli";
import { HttpClient, computeSummary } from "@hydroid/security-core";
import type {
  ScanTarget,
  ScanResult,
  Vulnerability,
  ScannerConfig,
} from "@hydroid/security-core";

import { Logger } from "@tsed/logger";

export interface SqliTestOptions {
  url: string;
  params?: string[];
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: string;
  depth?: "quick" | "full";
}

export class SQLInjectionTester {
  readonly name = "SQLInjectionTester";
  readonly version = "1.0.0";

  private scanner: SQLInjectionScanner;
  private logger: Logger;
  private initialized = false;

  constructor() {
    this.scanner = new SQLInjectionScanner();
    this.logger = new Logger("SQLInjectionTester");
  }

  async initialize(): Promise<void> {
    this.initialized = true;
  }

  async dispose(): Promise<void> {
    this.initialized = false;
  }

  private ensureInitialized(): void {
    if (!this.initialized)
      throw new Error(
        "SQLInjectionTester not initialized. Call initialize() first.",
      );
  }

  async execute(options: SqliTestOptions): Promise<ScanResult> {
    return this.test(options);
  }

  async test(options: SqliTestOptions): Promise<ScanResult> {
    this.ensureInitialized();

    const startTime = new Date().toISOString();

    const target: ScanTarget = {
      url: options.url,
      method: options.method ?? "GET",
      headers: options.headers,
      body: options.body,
    };

    try {
      const vulns = await this.scanner.scan(target);
      const endTime = new Date().toISOString();

      return {
        target,
        status: "completed",
        startTime,
        endTime,
        vulnerabilities: vulns,
        summary: computeSummary(vulns),
      };
    } catch (error) {
      const endTime = new Date().toISOString();
      return {
        target,
        status: "failed",
        startTime,
        endTime,
        vulnerabilities: [],
        summary: { total: 0, critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export function createSQLInjectionTester(): SQLInjectionTester {
  return new SQLInjectionTester();
}
