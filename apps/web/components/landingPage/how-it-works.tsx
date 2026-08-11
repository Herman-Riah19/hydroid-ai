import { MousePointerClick, Settings2, Rocket, BarChart3 } from "lucide-react";
import { Card } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";

const STEPS = [
  {
    number: "01",
    title: "Sélectionnez",
    description: "Choisissez votre type d'action et votre module de scan.",
    icon: MousePointerClick,
  },
  {
    number: "02",
    title: "Configurez",
    description: "Définissez vos paramètres et vos modèles IA.",
    icon: Settings2,
  },
  {
    number: "03",
    title: "Exécutez",
    description: "Lancez l'opération avec un suivi en temps réel.",
    icon: Rocket,
  },
  {
    number: "04",
    title: "Analysez",
    description: "Exploitez les résultats et appliquez les remédiations.",
    icon: BarChart3,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-y border-border bg-muted/30 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 border-transparent bg-secondary/15 text-secondary"
          >
            Comment ça marche
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            4 étapes pour{" "}
            <span className="bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent">
              sécuriser votre plateforme
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Un workflow simple et guidé pour vos opérations de sécurité.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ number, title, description, icon: Icon }, i) => (
            <Card
              key={number}
              className="relative gap-0 border-border p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-xl bg-muted text-foreground">
                  <Icon className="size-5" />
                </div>
                <span className="text-5xl font-bold text-muted/60">
                  {number}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {description}
              </p>
              {i < STEPS.length - 1 && (
                <span className="absolute right-1/2 top-1/2 hidden size-2 translate-x-1/2 rounded-full bg-border lg:block" />
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
