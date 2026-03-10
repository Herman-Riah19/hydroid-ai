"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import {
  Bot,
  Brain,
  Search,
  Shield,
  Settings,
  Play,
  Plus,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";

export default function AIHubPage() {
  const agentStats = [
    { name: "Agents actifs", value: "5", icon: Bot, color: "bg-blue-500" },
    {
      name: "Tâches en cours",
      value: "12",
      icon: Settings,
      color: "bg-orange-500",
    },
    { name: "Modèles IA", value: "8", icon: Brain, color: "bg-purple-500" },
    {
      name: "Recherches OSINT",
      value: "24",
      icon: Search,
      color: "bg-green-500",
    },
  ];

  const quickActions = [
    {
      name: "Créer un Agent",
      href: "/dashboard/ai-hub/agents/new",
      icon: Plus,
    },
    {
      name: "Nouvelle Recherche",
      href: "/dashboard/ai-hub/osint/search",
      icon: Search,
    },
    {
      name: "Fine-tuning",
      href: "/dashboard/ai-hub/fine-tuning/new",
      icon: Brain,
    },
    {
      name: "Base Armes",
      href: "/dashboard/ai-hub/premium/weapons",
      icon: Shield,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Hub</h1>
        <p className="text-gray-600">
          Gérez vos agents IA, fine-tuning et recherches OSINT
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agentStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {stat.name}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>
            Accédez rapidement aux fonctionnalités principales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.name} href={action.href}>
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-sm">{action.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              Agents IA Récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Research Agent</p>
                    <p className="text-sm text-gray-500">Type: RESEARCH</p>
                  </div>
                </div>
                <Badge variant="secondary">Actif</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium">Image Analyzer</p>
                    <p className="text-sm text-gray-500">
                      Type: IMAGE_ANALYSIS
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">Actif</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">OSINT Hunter</p>
                    <p className="text-sm text-gray-500">Type: OSINT</p>
                  </div>
                </div>
                <Badge variant="outline">Inactif</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Recherches OSINT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Recherche bâtiment</p>
                  <p className="text-sm text-gray-500">Tour Eiffel, Paris</p>
                </div>
                <Badge>Complété</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Profil humain</p>
                  <p className="text-sm text-gray-500">John Doe</p>
                </div>
                <Badge variant="secondary">En cours</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Analyse objet</p>
                  <p className="text-sm text-gray-500">iPhone 15 Pro</p>
                </div>
                <Badge variant="outline">En attente</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
