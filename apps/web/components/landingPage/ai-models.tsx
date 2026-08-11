import { Terminal, Cpu, Layers } from "lucide-react";
import { Card } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";

const PROVIDERS = [
  {
    icon: Terminal,
    name: "Ollama",
    description: "Modèles locaux performants",
    tag: "Local",
  },
  {
    icon: Cpu,
    name: "LM Studio",
    description: "Interface de gestion de modèles",
    tag: "Local",
  },
];

const MODELS = [
  { name: "qwen2.5:14b", badge: "Recommandé" },
  { name: "llama3.2:3b", badge: "Rapide" },
  { name: "mistral:7b", badge: "Équilibré" },
  { name: "codellama:7b", badge: "Code" },
];

export function AiModels() {
  return (
    <section id="ai-models" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Badge
              variant="secondary"
              className="mb-4 border-transparent bg-secondary/15 text-secondary"
            >
              Vos modèles IA
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Connectez vos propres{" "}
              <span className="bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent">
                modèles d&apos;IA
              </span>
            </h2>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Utilisez Ollama ou LM Studio pour brancher vos modèles
              personnalisés. Qwen, Llama, Mistral — le choix vous appartient,
              vos données restent locales.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {PROVIDERS.map(({ icon: Icon, name, description, tag }) => (
                <Card
                  key={name}
                  className="gap-0 border-border p-5 transition-all duration-300 hover:border-primary/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-muted text-foreground">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="flex size-2 items-center justify-center">
                      <span className="absolute size-2 animate-ping rounded-full bg-primary/50" />
                    </span>
                    <Badge
                      variant="outline"
                      className="border-primary/30 bg-primary/10 text-primary"
                    >
                      {tag}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-2xl bg-gradient-to-br from-primary/15 via-transparent to-secondary/15 blur-2xl" />
            <Card className="relative border-border p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-foreground">
                  <Layers className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Modèles disponibles
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    4 modèles actifs
                  </p>
                </div>
              </div>
              <div className="space-y-2.5">
                {MODELS.map((model) => (
                  <div
                    key={model.name}
                    className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3"
                  >
                    <span className="font-mono text-sm text-foreground">
                      {model.name}
                    </span>
                    <Badge
                      variant="secondary"
                      className="border-transparent bg-secondary/15 text-secondary"
                    >
                      {model.badge}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between rounded-lg bg-primary/10 px-4 py-3">
                <span className="text-sm text-foreground">
                  Analyse IA en temps réel
                </span>
                <span className="flex items-center gap-1.5 text-xs text-primary">
                  <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                  Actif
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
