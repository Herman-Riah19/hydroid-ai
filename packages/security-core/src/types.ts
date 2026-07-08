export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type ScanStatus = "pending" | "running" | "completed" | "failed";

export interface ScanTarget {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: string;
  cookies?: Record<string, string>;
}

export interface Vulnerability {
  id: string;
  name: string;
  description: string;
  severity: Severity;
  category: VulnerabilityCategory;
  location?: string;
  evidence?: string;
  remediation?: string;
  cve?: string;
  cvss?: number;
  payload?: string;
}

export type VulnerabilityCategory =
  | "sql-injection"
  | "xss"
  | "ssrf"
  | "xxe"
  | "csrf"
  | "authentication"
  | "authorization"
  | "information-disclosure"
  | "misconfiguration"
  | "ssl-tls"
  | "cors"
  | "cookie-security"
  | "security-headers"
  | "open-redirect"
  | "idor"
  | "command-injection"
  | "file-inclusion"
  | "other";

export interface ScanResult {
  target: ScanTarget;
  status: ScanStatus;
  startTime: string;
  endTime?: string;
  duration?: number;
  vulnerabilities: Vulnerability[];
  summary: ScanSummary;
  responses?: HttpResponseInfo[];
  error?: string;
}

export interface ScanSummary {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
}

export interface HttpResponseInfo {
  url: string;
  statusCode: number;
  headers: Record<string, string>;
  bodyLength: number;
  responseTime: number;
}

export interface ScannerConfig {
  timeout?: number;
  followRedirects?: boolean;
  userAgent?: string;
  concurrentRequests?: number;
}

export interface BaseScanner {
  readonly name: string;
  readonly description: string;
  scan(target: ScanTarget, config?: ScannerConfig): Promise<Vulnerability[]>;
}
