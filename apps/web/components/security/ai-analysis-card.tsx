"use client";

import { Brain, ShieldAlert, Swords, ClipboardCheck } from "lucide-react";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import type { AiAnalysis } from "@/services/securityServices";

interface AiAnalysisCardProps {
  analysis: AiAnalysis;
}

function Section({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ElementType;
  title: string;
  items: string[];
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <Icon className="size-3.5 text-muted-foreground" />
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h4>
      </div>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-xs leading-relaxed text-muted-foreground">
            {item.startsWith("- ") ? item.slice(2) : item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AiAnalysisCard({ analysis }: AiAnalysisCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-muted">
            <Brain className="size-4 text-foreground" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Analyse IA</h3>
          <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
            LM Studio
          </span>
        </div>

        {analysis.riskSummary && (
          <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
            {analysis.riskSummary}
          </p>
        )}

        <div className="space-y-4">
          <Section
            icon={ShieldAlert}
            title="Vecteurs d'attaque"
            items={analysis.attackVectors}
          />
          <Section
            icon={ClipboardCheck}
            title="Actions prioritaires"
            items={analysis.priorityActions}
          />
          <Section
            icon={Swords}
            title="Recommandations"
            items={analysis.recommendations}
          />
        </div>
      </CardContent>
    </Card>
  );
}
