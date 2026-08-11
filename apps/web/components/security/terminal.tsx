"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

interface LogEntry {
  type: string;
  message: string;
  timestamp: string;
}

interface SecurityTerminalProps {
  logs: LogEntry[];
  className?: string;
}

const TYPE_STYLES: Record<string, string> = {
  "scan-start": "text-secondary",
  "scan-ok": "text-primary",
  "scan-vulns": "text-yellow-600",
  "scan-error": "text-destructive",
  init: "text-secondary",
  info: "text-muted-foreground",
  complete: "text-primary font-semibold",
  connected: "text-primary",
  error: "text-destructive font-semibold",
};

const TYPE_PREFIX: Record<string, string> = {
  "scan-start": "→",
  "scan-ok": "✓",
  "scan-vulns": "⚠",
  "scan-error": "✗",
  error: "!!",
  complete: "✔",
};

export function SecurityTerminal({ logs, className }: SecurityTerminalProps) {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card font-mono text-sm shadow-2xl shadow-black/40",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
        <span className="size-3 rounded-full bg-destructive/70" />
        <span className="size-3 rounded-full bg-yellow-500/70" />
        <span className="size-3 rounded-full bg-primary/70" />
        <Terminal className="ml-3 size-4 text-muted-foreground" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          hydroid-cli
        </span>
        <span className="ml-auto rounded bg-muted px-2 py-0.5 text-[10px] tabular-nums text-muted-foreground">
          {logs.length} lignes
        </span>
      </div>

      <div ref={logRef} className="flex-1 space-y-1.5 overflow-y-auto p-5">
        {logs.length === 0 && (
          <div className="flex gap-2.5 text-muted-foreground">
            <span className="shrink-0 text-foreground">$</span>
            <span className="italic text-muted-foreground/60">
              En attente du scan...
            </span>
          </div>
        )}
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2.5 leading-relaxed">
            <span className="w-14 shrink-0 select-none text-right tabular-nums text-muted-foreground/40">
              {log.timestamp}
            </span>
            <span
              className={cn(
                "w-5 shrink-0 select-none",
                TYPE_STYLES[log.type] || "text-foreground",
              )}
            >
              {TYPE_PREFIX[log.type] || "·"}
            </span>
            <span
              className={cn(
                "flex-1 break-words",
                TYPE_STYLES[log.type] || "text-foreground",
              )}
            >
              {log.message}
            </span>
          </div>
        ))}
        <div className="flex gap-2.5 pt-1">
          <span className="shrink-0 text-foreground">$</span>
          <span className="inline-block h-4 w-2 animate-pulse bg-primary" />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border bg-muted/30 px-5 py-2.5">
        <span className="text-[11px] text-muted-foreground">
          {logs.length > 0 ? "Scan en cours / terminé" : "Ready"}
        </span>
        <span className="flex gap-1">
          {logs.slice(-6).map((log, i) => (
            <span
              key={i}
              className={cn(
                "size-1.5 rounded-full",
                log.type === "error" || log.type === "scan-error"
                  ? "bg-destructive"
                  : log.type === "complete"
                    ? "bg-primary"
                    : "bg-secondary",
              )}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
