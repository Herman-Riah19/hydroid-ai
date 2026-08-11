"use client";

import {
  Search,
  Globe,
  Lock,
  FileSearch,
  ScanLine,
  Terminal,
} from "lucide-react";
import { Card, CardContent } from "@repo/ui/components/ui/card";

const FEATURES = [
  { icon: Globe, label: "En-têtes de sécurité" },
  { icon: Lock, label: "SSL / TLS" },
  { icon: FileSearch, label: "Injection SQL & XSS" },
  { icon: ScanLine, label: "Configuration serveur" },
] as const;

export function ScanPlaceholder() {
  return (
    <Card className="h-full">
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <div className="mb-6 rounded-2xl border border-border bg-muted p-4 shadow-lg shadow-black/20">
          <Search className="size-10 text-primary/50" />
        </div>

        <h3 className="mb-1 text-sm font-semibold text-foreground">
          Prêt pour l&apos;analyse
        </h3>
        <p className="mb-6 max-w-xs text-xs text-muted-foreground">
          Entrez l&apos;URL de votre cible et lancez un scan pour détecter les
          vulnérabilités potentielles.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2"
            >
              <Icon className="size-4 shrink-0 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground/60">
          <Terminal className="size-3" />$ hydroid scan --help
        </p>
      </CardContent>
    </Card>
  );
}
