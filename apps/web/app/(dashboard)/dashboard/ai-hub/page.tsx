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
    { name: "Agents actifs", value: "5", icon: Bot },
    { name: "Tâches en cours", value: "12", icon: Settings },
    { name: "Modèles IA", value: "8", icon: Brain },
    { name: "Scans sécurité", value: "24", icon: Shield },
  ];

  const quickActions = [
    {
      name: "Créer un Agent",
      href: "/dashboard/ai-hub/agents/new",
      icon: Plus,
    },
    {
      name: "Security Scanner",
      href: "/dashboard/ai-hub/security",
      icon: Shield,
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
        <h1 className="text-3xl font-bold text-gray-100">AI Hub</h1>
        <p className="text-gray-500">
          Gérez vos agents IA, fine-tuning et scans de sécurité
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agentStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-gray-800">
                    <Icon className="h-6 w-6 text-gray-300" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      {stat.name}
                    </p>
                    <p className="text-2xl font-bold text-gray-100">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Actions rapides</CardTitle>
          <CardDescription className="text-gray-500">
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
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-gray-700"
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
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100 flex items-center">
              <Bot className="mr-2 h-5 w-5 text-gray-400" />
              Agents IA Récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-100">Research Agent</p>
                    <p className="text-sm text-gray-500">Type: RESEARCH</p>
                  </div>
                </div>
                <Badge variant="secondary">Actif</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-100">Image Analyzer</p>
                    <p className="text-sm text-gray-500">
                      Type: IMAGE_ANALYSIS
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">Actif</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-100">Security Hunter</p>
                    <p className="text-sm text-gray-500">Type: SECURITY</p>
                  </div>
                </div>
                <Badge variant="outline">Inactif</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100 flex items-center">
              <Shield className="mr-2 h-5 w-5 text-gray-400" />
              Scans Récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-100">Scan: example.com</p>
                  <p className="text-sm text-gray-500">Headers & CORS</p>
                </div>
                <Badge>Complété</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-100">SQLi Test</p>
                  <p className="text-sm text-gray-500">api.example.com</p>
                </div>
                <Badge variant="secondary">En cours</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-100">XSS Scan</p>
                  <p className="text-sm text-gray-500">app.example.com</p>
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
