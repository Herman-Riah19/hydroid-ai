import Link from "next/link";
import { Shield, ChevronRight } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";

export function Cta() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-secondary/10 p-10 text-center sm:p-14">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          </div>

          <div className="relative">
            <Badge
              variant="outline"
              className="mb-5 border-primary/30 bg-primary/10 px-3 py-1 text-primary"
            >
              <Shield className="size-3.5" />
              Commencez maintenant
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Prêt à sécuriser votre site&nbsp;?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Scannez les vulnérabilités, identifiez les failles, renforcez
              votre sécurité. Gratuit pour commencer, sans carte bancaire.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/dashboard/ai-hub/security">
                <Button size="lg" className="group h-12 px-8">
                  <Shield className="size-4" />
                  Lancer un scan gratuit
                  <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-foreground"
                >
                  Créer un compte
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
