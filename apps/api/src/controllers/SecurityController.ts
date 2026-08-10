import { Controller, Inject } from "@tsed/di";
import { BodyParams, QueryParams, Context } from "@tsed/platform-params";
import { Post, Get, Returns, Summary, Title, Description } from "@tsed/schema";
import { Docs } from "@tsed/swagger";
import { SecurityScannerService } from "src/services/SecurityScannerService.js";
import type { ScanResult } from "@hydroid/security-core";
import { Readable } from "node:stream";
import { Logger } from "@tsed/logger";

@Controller("/security")
@Docs("api-docs")
export class SecurityController {
  @Inject()
  private securityService!: SecurityScannerService;

  @Inject()
  private logger!: Logger;

  @Post("/scan")
  @Title("Security Scan")
  @Summary("Run a full security scan on a URL")
  @Description(
    "Scans a target URL for security vulnerabilities via 6 parallel modules: security headers, cookies, CORS, SSL/TLS, SQL injection, and XSS",
  )
  @Returns(200, Object)
  async scanUrl(
    @BodyParams()
    body: {
      url: string;
      modules?: string[];
    },
  ): Promise<ScanResult> {
    return this.securityService.scanUrl(body.url);
  }

  @Post("/analyze")
  @Title("Vulnerability Analysis")
  @Summary("Analyze URL for web vulnerabilities")
  @Description(
    "Analyzes security headers, cookies, CORS configuration, and SSL/TLS settings",
  )
  @Returns(200, Object)
  async analyzeUrl(@BodyParams() body: { url: string }): Promise<ScanResult> {
    return this.securityService.analyzeUrl(body.url);
  }

  @Post("/sqli-test")
  @Title("SQL Injection Test")
  @Summary("Test URL for SQL injection vulnerabilities")
  @Description("Runs multiple SQL injection payloads against the target URL")
  @Returns(200, Object)
  async testSQLInjection(
    @BodyParams() body: { url: string; params?: string[] },
  ): Promise<ScanResult> {
    return this.securityService.testSQLInjection(body.url);
  }

  @Post("/full-audit")
  @Title("Full Security Audit")
  @Summary("Run complete security audit")
  @Description(
    "Runs all security modules (scan + analysis + SQLi test) in parallel and combines results",
  )
  @Returns(200, Object)
  async fullAudit(@BodyParams() body: { url: string }): Promise<{
    scan: ScanResult;
    analysis: ScanResult;
    sqli: ScanResult;
  }> {
    return this.securityService.fullAudit(body.url);
  }
  @Get("/scan/stream")
  @Title("Security Scan Stream")
  @Summary("Run security scan with real-time streaming")
  @Description("Streams scan progress events via NDJSON HTTP Stream")
  async scanUrlStream(
    @QueryParams("url") url: string,
    @Context() ctx: any
  ): Promise<Readable> {
    this.logger.info(`Scan URL stream started for: ${url}`);

    const stream = new Readable({
      read() {}
    });

    (async () => {
      try {
        const result = await this.securityService.scanUrl(url, (event: any) => {
          this.logger.info(`Scan event: ${event.type}`);
          
          stream.push(`${JSON.stringify(event)}\n`);
        });
        stream.push(
          `${JSON.stringify({
            type: "complete",
            message: "Scan terminé avec succès",
            data: result
          })}\n`
        );

      } catch (error) {
        const errMsg = error instanceof Error ? error.message : "Erreur inconnue";
        this.logger.error(`Scan error: ${errMsg}`);
        
        stream.push(
          `${JSON.stringify({
            type: "error",
            message: errMsg
          })}\n`
        );
      } finally {
        // Fermeture du flux
        stream.push(null);
      }
    })();

    return stream;
  }
}
