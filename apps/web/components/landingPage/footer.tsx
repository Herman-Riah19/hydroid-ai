import Link from "next/link";
import { Shield } from "lucide-react";

const LINKS = [
  {
    title: "Produit",
    items: [
      { label: "Fonctionnalités", href: "#features" },
      { label: "Comment ça marche", href: "#how-it-works" },
      { label: "Modèles IA", href: "#ai-models" },
      { label: "AI Hub", href: "#ai-hub" },
    ],
  },
  {
    title: "Compte",
    items: [
      { label: "Connexion", href: "/login" },
      { label: "Inscription", href: "/register" },
      { label: "Tableau de bord", href: "/dashboard" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Shield className="size-5" />
              </span>
              <span className="text-lg font-bold tracking-tight text-foreground">
                Hydroid AI
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Plateforme de sécurité applicative propulsée par l&apos;IA. Scan
              de vulnérabilités, détection SQLi/XSS et analyse intelligente en
              un seul endroit.
            </p>
          </div>

          {LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 Hydroid AI. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground">Sécurité</span>
            <span className="text-sm text-muted-foreground">
              Confidentialité
            </span>
            <span className="text-sm text-muted-foreground">
              Mentions légales
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
