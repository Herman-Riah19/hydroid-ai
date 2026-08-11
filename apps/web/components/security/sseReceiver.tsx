"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, Radio } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

interface ScanDataPayload {
  id: string;
  status: "pending" | "scanning" | "completed";
  progress: number;
  message: string;
  timestamp: string;
}

const STATUS_STYLES: Record<string, string> = {
  INIT: "text-muted-foreground",
  CONNECTING: "text-secondary",
  CONNECTED: "text-primary",
  COMPLETED: "text-primary font-semibold",
  ERROR: "text-destructive",
};

export function SSEComponent() {
  const [logs, setLogs] = useState<ScanDataPayload[]>([]);
  const [status, setStatus] = useState<string>("INIT");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    const controller = new AbortController();

    async function connectStream() {
      try {
        setStatus("CONNECTING");

        const response = await fetch(
          "http://localhost:8083/api/streaming/sse",
          {
            signal: controller.signal,
          },
        );

        if (!response.ok || !response.body) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        setStatus("CONNECTED");

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            setStatus("COMPLETED");
            break;
          }

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.trim()) {
              try {
                const parsedData: ScanDataPayload = JSON.parse(line);
                setLogs((prev) => [...prev, parsedData]);
              } catch (e) {
                console.error("Erreur parsing JSON chunk :", e);
              }
            }
          }
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Erreur Stream Fetch :", err);
          setStatus("ERROR");
        }
      }
    }

    connectStream();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/4 -left-24 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border bg-card font-mono text-sm shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
          <span className="size-3 rounded-full bg-destructive/70" />
          <span className="size-3 rounded-full bg-yellow-500/70" />
          <span className="size-3 rounded-full bg-primary/70" />
          <Terminal className="ml-3 size-4 text-muted-foreground" />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            hydroid-sse
          </span>
          <span
            className={cn(
              "ml-auto flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[10px]",
              STATUS_STYLES[status] || "text-muted-foreground",
            )}
          >
            <Radio
              className={cn(
                "size-3",
                status === "CONNECTED" && "animate-pulse",
              )}
            />
            {status}
          </span>
        </div>

        <div ref={logRef} className="max-h-96 space-y-2 overflow-y-auto p-5">
          {logs.length === 0 ? (
            <div className="flex gap-2.5 text-muted-foreground">
              <span className="shrink-0 text-foreground">$</span>
              <span className="italic text-muted-foreground/60">
                En attente de données...
              </span>
            </div>
          ) : (
            logs.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-muted/40 p-3"
              >
                <div className="flex justify-between gap-2 text-[11px] text-muted-foreground">
                  <span className="tabular-nums">#{item.id}</span>
                  <span className="tabular-nums">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-1 font-mono text-sm",
                    item.status === "completed"
                      ? "text-primary"
                      : "text-foreground",
                  )}
                >
                  {item.message}
                </p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-150"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))
          )}
          <div className="flex gap-2.5 pt-1">
            <span className="shrink-0 text-foreground">$</span>
            <span className="inline-block h-4 w-2 animate-pulse bg-primary" />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border bg-muted/30 px-5 py-2.5">
          <span className="text-[11px] text-muted-foreground">
            {logs.length} événement(s) reçu(s)
          </span>
          <span className="text-[11px] text-muted-foreground">
            {status === "CONNECTED" ? "streaming..." : status.toLowerCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
