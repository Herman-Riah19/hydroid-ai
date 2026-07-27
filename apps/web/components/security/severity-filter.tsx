"use client";

import { XCircle, AlertTriangle, Bug, Globe } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import type { ScanSummary } from "@/services/securityServices";

const SEVERITY_ICONS: Record<string, React.ElementType> = {
  critical: XCircle,
  high: AlertTriangle,
  medium: Bug,
  low: Globe,
  info: Globe,
};

const SEVERITY_CLASSES: Record<string, string> = {
  critical: "text-destructive border-destructive/30 bg-destructive/10",
  high: "text-orange-500 border-orange-500/30 bg-orange-500/10",
  medium: "text-yellow-600 border-yellow-600/30 bg-yellow-600/10",
  low: "text-muted-foreground border-border bg-muted/50",
  info: "text-muted-foreground/70 border-border bg-muted/30",
};

interface SeverityFilterProps {
  summary: ScanSummary;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function SeverityFilter({
  summary,
  activeTab,
  onTabChange,
}: SeverityFilterProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {(["critical", "high", "medium", "low", "info"] as const).map((sev) => {
        const count = summary[sev];
        const Icon = SEVERITY_ICONS[sev]!;
        const isActive = activeTab === sev;
        return (
          <button
            key={sev}
            onClick={() => onTabChange(isActive ? "all" : sev)}
            className={cn(
              "flex cursor-pointer flex-col items-center gap-1 rounded-lg border p-3 transition-all",
              SEVERITY_CLASSES[sev],
              isActive ? "ring-1 ring-ring" : "opacity-60 hover:opacity-100",
            )}
          >
            <Icon className="size-4" />
            <span className="tabular-nums text-lg font-bold">{count}</span>
            <span className="text-[10px] uppercase tracking-wider">{sev}</span>
          </button>
        );
      })}
    </div>
  );
}
