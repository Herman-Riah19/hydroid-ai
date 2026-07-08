import { Injectable, Inject } from "@tsed/di";
import { SkillFactory } from "../factories/SkillFactory.js";
import { Logger } from "@tsed/logger";
import type { ScanResult } from "@hydroid/security-core";
import type { ScanEventCallback } from "src/tools/WebScanner.js";

@Injectable()
export class SecurityScannerService {
  constructor(
    @Inject() private skillFactory: SkillFactory,
    private logger: Logger,
  ) { }

  async scanUrl(url: string, onEvent?: ScanEventCallback): Promise<ScanResult> {
    this.logger.info(`Starting security scan for: ${url}`);
    return this.skillFactory.scanner.scan({ url, onEvent });
  }

  async analyzeUrl(url: string): Promise<ScanResult> {
    this.logger.info(`Starting vulnerability analysis for: ${url}`);
    return this.skillFactory.getVulnAnalyzer.analyze({ url });
  }

  async testSQLInjection(url: string): Promise<ScanResult> {
    this.logger.info(`Starting SQL injection test for: ${url}`);
    return this.skillFactory.getSqliTester.test({ url });
  }

  async fullAudit(url: string): Promise<{
    scan: ScanResult;
    analysis: ScanResult;
    sqli: ScanResult;
  }> {
    const [scan, analysis, sqli] = await Promise.all([
      this.scanUrl(url),
      this.analyzeUrl(url),
      this.testSQLInjection(url),
    ]);
    return { scan, analysis, sqli };
  }
}
