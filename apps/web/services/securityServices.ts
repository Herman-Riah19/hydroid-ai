import { headersAuthFetch } from "@/utils/header-fetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ScanEvent {
  type: string;
  message: string;
  data?: unknown;
}

export interface Vulnerability {
  id: string;
  name: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  category: string;
  location?: string;
  evidence?: string;
  remediation?: string;
  payload?: string;
}

export interface ScanSummary {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
}

export interface ScanResult {
  target: { url: string };
  status: string;
  startTime: string;
  endTime?: string;
  vulnerabilities: Vulnerability[];
  summary: ScanSummary;
  error?: string;
}

export class SecurityServices {
  static async scanUrl(url: string, token: string): Promise<ScanResult> {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/security/scan`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify({ url }),
    });
    if (!res.ok) throw new Error(`Scan failed: ${res.statusText}`);
    return res.json();
  }

  static async analyzeUrl(url: string, token: string): Promise<ScanResult> {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/security/analyze`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify({ url }),
    });
    if (!res.ok) throw new Error(`Analysis failed: ${res.statusText}`);
    return res.json();
  }

  static async testSQLInjection(
    url: string,
    token: string,
  ): Promise<ScanResult> {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/security/sqli-test`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify({ url }),
    });
    if (!res.ok) throw new Error(`SQLi test failed: ${res.statusText}`);
    return res.json();
  }

  static async fullAudit(
    url: string,
    token: string,
  ): Promise<{
    scan: ScanResult;
    analysis: ScanResult;
    sqli: ScanResult;
  }> {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/security/full-audit`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify({ url }),
    });
    if (!res.ok) throw new Error(`Audit failed: ${res.statusText}`);
    return res.json();
  }

  static streamScan(url: string, token: string): EventSource {
    const params = new URLSearchParams({ url });
    const es = new EventSource(`${API_URL}/api/security/scan/stream?${params}`);
    return es;
  }
}
