import { Shield, Bug, Brain, FileText, Globe, Radar } from "lucide-react";
import { Card } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { cn } from "@repo/ui/lib/utils";

const MODULES = [
  { name: "Security Headers", status: "ok" },
  { name: "Cookies", status: "warn" },
  { name: "CORS", status: "ok" },
  { name: "SSL / TLS", status: "ok" },
  { name: "SQL Injection", status: "ok" },
  { name: "XSS", status: "warn" },
] as const;

const SEVERITY = [
  { level: "Critical", count: 0, cls: "text-destructive" },
  { level: "High", count: 1, cls: "text-orange-500" },
  { level: "Medium", count: 2, cls: "text-yellow-600" },
  { level: "Low", count: 4, cls: "text-muted-foreground" },
];

function Tile({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-border p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
        className,
      )}
    >
      {children}
    </Card>
  );
}

function TileIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
      <Icon className="size-6" />
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 border-transparent bg-secondary/15 text-secondary"
          >
            Fonctionnalités
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tout ce dont vous avez besoin pour{" "}
            <span className="bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent">
              sécuriser vos applications
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Une suite complète d&apos;outils de renseignement et d&apos;analyse
            conçue pour les équipes de sécurité.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[minmax(9rem,auto)]">
          <Tile className="md:col-span-2 md:row-span-2">
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between">
                <TileIcon icon={Shield} />
                <Badge variant="outline" className="text-muted-foreground">
                  15+ modules
                </Badge>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Security Scanner
              </h3>
              <p className="mt-2 max-w-md text-muted-foreground">
                Scan complet de vulnérabilités web : en-têtes, cookies, CORS,
                SSL/TLS et configuration serveur, avec streaming en temps réel.
              </p>

              <div className="mt-6 grid flex-1 content-end gap-2">
                {MODULES.map((m) => (
                  <div
                    key={m.name}
                    className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3.5 py-2"
                  >
                    <span className="text-sm text-foreground">{m.name}</span>
                    <span
                      className={cn(
                        "flex items-center gap-1.5 text-xs",
                        m.status === "ok" ? "text-primary" : "text-yellow-600",
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          m.status === "ok" ? "bg-primary" : "bg-yellow-600",
                        )}
                      />
                      {m.status === "ok" ? "Sécurisé" : "À corriger"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Tile>

          <Tile>
            <TileIcon icon={Bug} />
            <h3 className="text-lg font-semibold text-foreground">
              Détection SQLi & XSS
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Test d&apos;injection SQL et XSS avec 15 payloads chacun.
            </p>
          </Tile>

          <Tile>
            <TileIcon icon={Brain} />
            <h3 className="text-lg font-semibold text-foreground">
              Analyse IA
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Priorisation intelligente avec Qwen, Llama et vos modèles
              personnalisés.
            </p>
          </Tile>

          <Tile className="md:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <TileIcon icon={FileText} />
                <h3 className="text-lg font-semibold text-foreground">
                  Rapports détaillés
                </h3>
                <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
                  Preuves de concept, recommandations et remédiations pour
                  chaque vulnérabilité identifiée.
                </p>
              </div>
              <div className="hidden shrink-0 flex-col gap-2 sm:flex">
                {SEVERITY.map((s) => (
                  <div
                    key={s.level}
                    className="flex items-center justify-between gap-6 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-sm"
                  >
                    <span className="text-muted-foreground">{s.level}</span>
                    <span className={cn("font-semibold", s.cls)}>
                      {s.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Tile>

          <Tile className="md:row-span-2">
            <TileIcon icon={Radar} />
            <h3 className="text-lg font-semibold text-foreground">
              Renseignement continu
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Surveillez vos surfaces d&apos;attaque en continu et soyez alerté
              dès qu&apos;une nouvelle vulnérabilité apparaît.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-3.5 py-3">
              <Globe className="size-5 shrink-0 text-secondary" />
              <div className="min-w-0">
                <p className="truncate text-sm text-foreground">example.com</p>
                <p className="text-xs text-muted-foreground">
                  Dernier scan : il y a 2 min
                </p>
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}
