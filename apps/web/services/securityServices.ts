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

export interface AiAnalysis {
  riskSummary: string;
  recommendations: string[];
  attackVectors: string[];
  priorityActions: string[];
}

export interface ScanResult {
  target: { url: string };
  status: string;
  startTime: string;
  endTime?: string;
  vulnerabilities: Vulnerability[];
  summary: ScanSummary;
  aiAnalysis?: AiAnalysis;
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

  static async streamScan(url: string, signal: AbortSignal) {
    const params = new URLSearchParams({ url });
    const response = await fetch(`${API_URL}/api/security/scan/stream?${params}`, {
      signal,
      headers: {
        "Accept": "*/*"
      }
    });

    if (!response.ok || !response.body) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    return response.body.getReader();
  }
}
