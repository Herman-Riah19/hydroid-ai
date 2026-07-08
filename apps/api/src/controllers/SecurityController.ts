import { Controller, Inject } from "@tsed/di";
import { BodyParams, QueryParams, Context } from "@tsed/platform-params";
import { Post, Get, Returns, Summary, Title, Description } from "@tsed/schema";
import { Docs } from "@tsed/swagger";
import { SecurityScannerService } from "src/services/SecurityScannerService.js";
import type { ScanResult } from "@hydroid/security-core";
import type { Response } from "express";

@Controller("/security")
@Docs("api-docs")
export class SecurityController {
  @Inject()
  private securityService!: SecurityScannerService;

  @Post("/scan")
  @Title("Security Scan")
  @Summary("Run a full security scan on a URL")
  @Description(
    "Scans a target URL for security vulnerabilities including headers, cookies, CORS, SSL, SQLi, and XSS",
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
    "Analyzes headers, cookies, CORS configuration, SSL/TLS, and XSS vulnerabilities",
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
  @Description("Combines all security scans into a comprehensive audit report")
  @Returns(200, Object)
  async fullAudit(@BodyParams() body: { url: string }): Promise<{
    scan: ScanResult;
    analysis: ScanResult;
    sqli: ScanResult;
  }> {
    return this.securityService.fullAudit(body.url);
  }

  @Get("/scan/stream")
  @Title("Security Scan SSE")
  @Summary("Run security scan with real-time SSE streaming")
  @Description("Streams scan progress events via Server-Sent Events")
  async scanUrlStream(
    @QueryParams("url") url: string,
    @Context() ctx: any,
  ): Promise<void> {
    const response = ctx.getResponse() as Response;

    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Connection", "keep-alive");
    response.setHeader("X-Accel-Buffering", "no");
    response.flushHeaders();

    response.write(
      `event: connected\ndata: ${JSON.stringify({ message: "Scan connecté" })}\n\n`,
    );

    try {
      const result = await this.securityService.scanUrl(url, (event) => {
        response.write(
          `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`,
        );
      });

      response.write(
        `event: complete\ndata: ${JSON.stringify({ type: "complete", message: "Scan terminé avec succès", data: result })}\n\n`,
      );
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Erreur inconnue";
      response.write(
        `event: error\ndata: ${JSON.stringify({ type: "error", message: errMsg })}\n\n`,
      );
    } finally {
      response.end();
    }
  }
}
