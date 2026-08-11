import Link from "next/link";
import { Bot, Shield, Wand2, ArrowUpRight } from "lucide-react";
import { Card } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";

const ACTIONS = [
  {
    title: "Agents IA",
    description: "Créez et gérez vos agents intelligents",
    icon: Bot,
    href: "/dashboard/ai-hub/agents",
    badge: "AI Hub",
  },
  {
    title: "Security Scanner",
    description: "Lancez un scan de vulnérabilités web",
    icon: Shield,
    href: "/dashboard/ai-hub/security",
    badge: "Scanner",
  },
  {
    title: "Fine-Tuning",
    description: "Entraînez vos propres modèles",
    icon: Wand2,
    href: "/dashboard/ai-hub/fine-tuning",
    badge: "AI Hub",
  },
];

export function AiHub() {
  return (
    <section id="ai-hub" className="border-y border-border bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 border-transparent bg-secondary/15 text-secondary"
          >
            AI Hub
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Découvrez nos{" "}
            <span className="bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent">
              capacités IA avancées
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explorez l&apos;ensemble des outils propulsés par l&apos;IA
            disponibles sur la plateforme.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {ACTIONS.map(({ title, description, icon: Icon, href, badge }) => (
            <Link key={title} href={href} className="group">
              <Card className="relative gap-0 border-border p-6 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" />
                  </div>
                  <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                  <Badge variant="outline" className="text-muted-foreground">
                    {badge}
                  </Badge>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
