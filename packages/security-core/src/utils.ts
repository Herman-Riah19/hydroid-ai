import type { ScanSummary, Vulnerability } from "./types.js";

export function computeSummary(vulns: Vulnerability[]): ScanSummary {
  const summary: ScanSummary = {
    total: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0,
  };
  for (const v of vulns) {
    summary.total++;
    summary[v.severity]++;
  }
  return summary;
}

export function createVulnerabilityId(): string {
  return `VULN-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`.toUpperCase();
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
