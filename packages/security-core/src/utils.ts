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

export async function runWithConcurrency<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number,
): Promise<T[]> {
  const results: T[] = [];
  const executing = new Set<Promise<void>>();
  let index = 0;

  async function runNext(): Promise<void> {
    if (index >= tasks.length) return;
    const i = index++;
    const task = tasks[i]!;
    const promise = task().then((result) => {
      results[i] = result;
    });
    const tracked = promise.then(() => {
      executing.delete(tracked);
    });
    executing.add(tracked);
    if (executing.size >= concurrency) {
      await Promise.race(executing);
    }
    await runNext();
  }

  await runNext();
  await Promise.all(executing);
  return results;
}
