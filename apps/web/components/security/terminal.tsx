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
  "scan-start": "text-blue-400",
  "scan-ok": "text-green-400",
  "scan-vulns": "text-yellow-400",
  "scan-error": "text-red-400",
  init: "text-cyan-400",
  info: "text-gray-400",
  complete: "text-green-300 font-semibold",
  connected: "text-green-500",
  error: "text-red-400 font-semibold",
};

export function SecurityTerminal({ logs, className }: SecurityTerminalProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div
      className={cn(
        "rounded-lg border border-gray-800 bg-gray-950 font-mono text-sm overflow-hidden",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-2 bg-gray-900/50">
        <Terminal className="h-4 w-4 text-gray-400" />
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          Console
        </span>
        <span className="ml-auto text-xs text-gray-600">
          {logs.length} lines
        </span>
      </div>
      <div className="h-64 overflow-y-auto p-4 space-y-1">
        {logs.length === 0 && (
          <p className="text-gray-600 italic">En attente du scan...</p>
        )}
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-gray-600 shrink-0 w-16 text-right tabular-nums">
              {log.timestamp}
            </span>
            <span
              className={cn(
                "shrink-0",
                TYPE_STYLES[log.type] || "text-gray-300",
              )}
            >
              {log.type === "scan-start"
                ? "→"
                : log.type === "scan-ok"
                  ? "✓"
                  : log.type === "scan-vulns"
                    ? "⚠"
                    : log.type === "scan-error"
                      ? "✗"
                      : log.type === "error"
                        ? "!!"
                        : log.type === "complete"
                          ? "✔"
                          : "·"}
            </span>
            <span
              className={cn("flex-1", TYPE_STYLES[log.type] || "text-gray-300")}
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
