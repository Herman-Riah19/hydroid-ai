"use client";

import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  FeatureSection,
  StatSection,
  StepsSection,
  ActionGrid,
} from "@repo/ui/components/composable/Sections";
import {
  Search,
  Globe,
  Brain,
  Image as ImageIcon,
  Shield,
  Zap,
  Cpu,
  Terminal,
  ChevronRight,
  Play,
  Layers,
  Bot,
  Scissors,
  FileSearch,
  Wand2,
  Microscope,
  Building2,
  Users,
  Package,
  Car,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const features = [
    {
      icon: Search,
      title: "OSINT Avancé",
      description:
        "Recherche approfondie de personas, emails, domaines et localisation",
    },
    {
      icon: Globe,
      title: "Web Scraping",
      description:
        "Collecte automatique de données depuis n'importe quelle source web",
    },
    {
      icon: Brain,
      title: "Analyse IA",
      description:
        "Traitement intelligent avec Qwen, Llama et vos modèles personnalisés",
    },
    {
      icon: ImageIcon,
      title: "Génération d'Images",
      description: "Création de visuels IA pour vos rapports et présentations",
    },
  ];

  const stats = [
    { value: "10K+", label: "Recherches OSINT", icon: Search },
    { value: "50M+", label: "Pages Scrapées", icon: Globe },
    { value: "99.9%", label: "Précision IA", icon: Brain },
    { value: "24/7", label: "Monitoring", icon: Shield },
  ];

  const steps = [
    {
      number: "01",
      title: "Sélectionnez",
      description: "Choisissez votre type d'action",
    },
    {
      number: "02",
      title: "Configurez",
      description: "Définissez vos paramètres",
    },
    { number: "03", title: "Exécutez", description: "Lancez l'opération" },
    { number: "04", title: "Analysez", description: "Exploitez les résultats" },
  ];

  const aiHubActions = [
    {
      title: "Agents IA",
      description: "Créez et gérez vos agents intelligents",
      icon: Bot,
      href: "/dashboard/ai-hub/agents",
    },
    {
      title: "OSINT",
      description: "Recherche d'intelligence open source",
      icon: FileSearch,
      href: "/dashboard/ai-hub/osint",
    },
    {
      title: "Fine-Tuning",
      description: "Entraînez vos propres modèles",
      icon: Wand2,
      href: "/dashboard/ai-hub/fine-tuning",
    },
  ];

  const osintActions = [
    {
      title: "Profil Humain",
      description: "Recherche de personas",
      icon: Users,
      href: "/dashboard/actions/osint?type=human",
    },
    {
      title: "Bâtiment",
      description: "Intelligence bâtiments",
      icon: Building2,
      href: "/dashboard/actions/osint?type=building",
    },
    {
      title: "Objet",
      description: "Suivi d'objets",
      icon: Package,
      href: "/dashboard/actions/osint?type=object",
    },
    {
      title: "Véhicule",
      description: "Identification véhicules",
      icon: Car,
      href: "/dashboard/actions/osint?type=vehicle",
    },
    {
      title: "Location",
      description: "Analyse de localisations",
      icon: Microscope,
      href: "/dashboard/actions/osint?type=location",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <Shield className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-bold">Hydroid AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-400 hover:text-gray-100 transition-colors"
            >
              Fonctionnalités
            </a>
            <a
              href="#how-it-works"
              className="text-gray-400 hover:text-gray-100 transition-colors"
            >
              Comment ça marche
            </a>
            <a
              href="#pricing"
              className="text-gray-400 hover:text-gray-100 transition-colors"
            >
              Tarifs
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-gray-100"
              >
                Connexion
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gray-100 text-black hover:bg-gray-200">
                Commencer
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-800/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-800/30 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="outline"
              className="mb-6 border-gray-700 text-gray-400"
            >
              <Zap className="h-3 w-3 mr-1" />
              Nouvelle Génération d'IA
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-100">
              Intelligence &<br />
              <span className="text-gray-400">Analyse Avancée</span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Plateforme de renseignement et d'analyse alimentée par l'IA.
              OSINT, scraping, analyse et génération - tout en un seul endroit.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-14 px-8 bg-gray-100 text-black hover:bg-gray-200 text-lg"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Commencer Gratuitement
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 border-gray-700 hover:bg-gray-800 text-lg"
                >
                  Voir la Démo
                </Button>
              </Link>
            </div>

            {/* Terminal Preview */}
            <div className="mt-16 mx-auto max-w-3xl">
              <div className="rounded-xl border border-gray-800 bg-gray-950 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-sm text-gray-500">
                    hydroid-cli
                  </span>
                </div>
                <div className="p-4 font-mono text-sm">
                  <div className="text-gray-300">
                    $ hydroid osint search "John Doe"
                  </div>
                  <div className="text-gray-600 mt-2">
                    [+] Recherche en cours...
                  </div>
                  <div className="text-gray-600">
                    [+] Sources: Google, LinkedIn, Twitter
                  </div>
                  <div className="text-gray-400">[✓] 3 profils trouvés</div>
                  <div className="text-gray-600 mt-1">
                    [+] Score de risque: 23%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <StatSection stats={stats} />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FeatureSection
            title="Tout ce dont vous avez besoin"
            subtitle="Une suite complète d'outils pour vos opérations de renseignement et d'analyse"
            features={features}
          />
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <StepsSection
            title="Comment ça marche"
            subtitle="4 étapes simples pour vos opérations"
            steps={steps}
          />
        </div>
      </section>

      {/* AI Providers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Vos propres modèles IA
              </h2>
              <p className="text-gray-400 mb-8">
                Connectez Ollama ou LM Studio pour utiliser vos modèles
                personnalisés. Qwen, Llama, Mistral - le choix vous appartient.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900 border border-gray-800">
                  <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center">
                    <Terminal className="h-6 w-6 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-100">Ollama</h4>
                    <p className="text-sm text-gray-500">
                      Modèles locaux performants
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900 border border-gray-800">
                  <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center">
                    <Cpu className="h-6 w-6 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-100">LM Studio</h4>
                    <p className="text-sm text-gray-500">
                      Interface de gestion de modèles
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gray-800 rounded-2xl blur-2xl opacity-50" />
              <div className="relative p-8 rounded-2xl bg-gray-900 border border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <Layers className="h-6 w-6 text-gray-300" />
                  <span className="font-semibold">Modèles Disponibles</span>
                </div>
                <div className="space-y-3">
                  {[
                    "qwen2.5:14b",
                    "llama3.2:3b",
                    "mistral:7b",
                    "codellama:7b",
                  ].map((model, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-800"
                    >
                      <span className="font-mono text-sm">{model}</span>
                      <Badge variant="outline" className="text-xs">
                        Actif
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Hub Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <ActionGrid
            title="AI Hub"
            subtitle="Découvrez nos capacités IA avancées"
            actions={aiHubActions}
          />
        </div>
      </section>

      {/* OSINT Actions */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <ActionGrid
            title="Actions OSINT"
            subtitle="Choisissez votre type de recherche"
            actions={osintActions}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à commencer ?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Rejoignez des milliers d'utilisateurs qui font confiance à Hydroid
            AI
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="h-14 px-12 bg-gray-100 text-black hover:bg-gray-200 text-lg"
            >
              Créer un Compte Gratuit
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Shield className="h-4 w-4 text-black" />
              </div>
              <span className="font-bold">Hydroid AI</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Hydroid AI. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
