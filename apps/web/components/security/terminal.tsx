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
  "scan-start": "text-blue-500",
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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card font-mono text-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2">
        <Terminal className="size-4 text-muted-foreground" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Console
        </span>
        <span className="ml-auto text-xs text-muted-foreground/50">
          {logs.length} lines
        </span>
      </div>
      <div className="h-full overflow-y-auto p-4 space-y-1">
        {logs.length === 0 && (
          <p className="italic text-muted-foreground/50">
            En attente du scan...
          </p>
        )}
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2">
            <span className="w-16 shrink-0 text-right tabular-nums text-muted-foreground/50">
              {log.timestamp}
            </span>
            <span
              className={cn(
                "shrink-0",
                TYPE_STYLES[log.type] || "text-foreground",
              )}
            >
              {TYPE_PREFIX[log.type] || "·"}
            </span>
            <span
              className={cn(
                "flex-1",
                TYPE_STYLES[log.type] || "text-foreground",
              )}
            >
              {log.message}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
