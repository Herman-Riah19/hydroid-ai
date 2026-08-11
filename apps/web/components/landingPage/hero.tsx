import Link from "next/link";
import { ArrowRight, Play, Sparkles, Zap } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import { ScanSimulation } from "./scan-simulation";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Badge
              variant="outline"
              className="mb-6 gap-1.5 border-primary/30 bg-primary/10 px-3 py-1 text-primary"
            >
              <Sparkles className="size-3.5" />
              Sécurité applicative propulsée par l&apos;IA
            </Badge>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Sécurité &{" "}
              <span className="bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent">
                Analyse Avancée
              </span>{" "}
              en temps réel
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Hydroid AI scanne vos applications web pour détecter les
              vulnérabilités : en-têtes, cookies, CORS, SSL/TLS, injections SQL
              et XSS — avec une analyse intelligente pour prioriser les
              remédiations.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="group h-12 px-8">
                  <Play className="size-4 transition-transform group-hover:scale-110" />
                  Commencer gratuitement
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-foreground"
                >
                  Voir la démo
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Zap className="size-4 text-primary" />
                Streaming temps réel
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="size-4 text-secondary" />
                Multi-modèles IA
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="size-4 text-muted-foreground" />
                Aucune carte requise
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-2xl" />
            <ScanSimulation className="relative" />
          </div>
        </div>
      </div>
    </section>
  );
}
