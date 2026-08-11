import { Shield, Bug, Brain, Activity } from "lucide-react";
import { Card } from "@repo/ui/components/ui/card";

const STATS = [
  { value: "15+", label: "Modules de scan", icon: Shield },
  { value: "30+", label: "Payloads sécurité", icon: Bug },
  { value: "99.9%", label: "Précision IA", icon: Brain },
  { value: "24/7", label: "Monitoring continu", icon: Activity },
];

export function Stats() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map(({ value, label, icon: Icon }) => (
            <Card
              key={label}
              className="gap-2 border-transparent bg-transparent py-4 text-center shadow-none"
            >
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-6" />
              </div>
              <div className="text-3xl font-bold tracking-tight text-foreground">
                {value}
              </div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
