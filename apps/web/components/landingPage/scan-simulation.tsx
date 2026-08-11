"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, Play } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

interface ScanLine {
  type: string;
  message: string;
}

const SCRIPT: ScanLine[] = [
  { type: "cmd", message: "hydroid scan --target example.com" },
  { type: "init", message: "Initialisation des modules de scan..." },
  { type: "info", message: "Analyse des en-têtes de sécurité..." },
  { type: "ok", message: "X-Frame-Options: manquant" },
  { type: "info", message: "Vérification de la configuration CORS..." },
  { type: "ok", message: "CORS: politiques correctement définies" },
  { type: "info", message: "Test SSL/TLS..." },
  { type: "warn", message: "Certificat expirant dans 14 jours" },
  { type: "info", message: "Détection SQL Injection..." },
  { type: "ok", message: "Aucune injection détectée" },
  { type: "info", message: "Détection XSS..." },
  { type: "warn", message: "XSS réfléchi détecté (2 payloads)" },
  { type: "info", message: "Analyse IA en cours (Qwen 2.5)..." },
  { type: "done", message: "3 vulnérabilités identifiées - Rapport généré" },
];

const TYPE_STYLES: Record<string, string> = {
  cmd: "text-foreground",
  init: "text-secondary",
  info: "text-muted-foreground",
  ok: "text-primary",
  warn: "text-yellow-600",
  done: "text-primary font-semibold",
};

const TYPE_PREFIX: Record<string, string> = {
  cmd: "$",
  init: "→",
  info: "·",
  ok: "✓",
  warn: "⚠",
  done: "✔",
};

const LINE_DELAY = 450;
const LOOP_DELAY = 2600;

export function ScanSimulation({ className }: { className?: string }) {
  const [count, setCount] = useState(0);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visible = SCRIPT.slice(0, count);
    const last = visible[visible.length - 1];

    if (last?.type === "done") {
      const t = setTimeout(() => setCount(0), LOOP_DELAY);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setCount((c) => c + 1), LINE_DELAY);
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [count]);

  const visible = SCRIPT.slice(0, count);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40",
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
        <span className="ml-auto flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
          <Play className="size-3" />
          simulation
        </span>
      </div>

      <div
        ref={logRef}
        className="max-h-72 space-y-1.5 overflow-y-auto p-5 font-mono text-sm"
      >
        {visible.map((line, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-2.5 leading-relaxed",
              i === 0 ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <span className="shrink-0 select-none">
              {TYPE_PREFIX[line.type] || "·"}
            </span>
            <span className={cn(TYPE_STYLES[line.type])}>{line.message}</span>
          </div>
        ))}
        <div className="flex gap-2.5">
          <span className="shrink-0 text-foreground">$</span>
          <span className="inline-block h-4 w-2 animate-pulse bg-primary" />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border bg-muted/30 px-5 py-2.5">
        <span className="text-xs text-muted-foreground">
          {count < SCRIPT.length
            ? `Scan en cours... ${Math.round((count / SCRIPT.length) * 100)}%`
            : "Scan terminé"}
        </span>
        <span className="flex gap-1">
          {SCRIPT.map((_, i) => (
            <span
              key={i}
              className={cn(
                "size-1.5 rounded-full transition-colors",
                i < count ? "bg-primary" : "bg-border",
              )}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
