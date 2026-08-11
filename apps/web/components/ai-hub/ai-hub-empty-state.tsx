import type { LucideIcon } from "lucide-react";
import { Badge } from "@repo/ui/components/ui/badge";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { cn } from "@repo/ui/lib/utils";

interface AiHubEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  status?: string;
  accent?: "primary" | "secondary";
}

export function AiHubEmptyState({
  icon: Icon,
  title,
  description,
  status = "À venir",
  accent = "primary",
}: AiHubEmptyStateProps) {
  return (
    <div className="relative overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/4 -left-24 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative">
        <Card className="overflow-x-hidden">
          <CardContent className="flex flex-col items-center justify-center p-16 text-center">
            <div
              className={cn(
                "mb-6 flex size-16 items-center justify-center rounded-2xl border shadow-lg shadow-black/20",
                accent === "primary"
                  ? "border-primary/30 bg-primary/10"
                  : "border-secondary/30 bg-secondary/10",
              )}
            >
              <Icon
                className={cn(
                  "size-8",
                  accent === "primary" ? "text-primary" : "text-secondary",
                )}
              />
            </div>
            <Badge
              variant="outline"
              className={cn(
                "mb-4",
                accent === "primary"
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-secondary/30 bg-secondary/10 text-secondary",
              )}
            >
              {status}
            </Badge>
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              {title}
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
