"use client";

import { useState, useEffect } from "react";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import {
  Bot,
  Plus,
  Play,
  Pause,
  Trash2,
  Settings,
  MoreVertical,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { AIAgentServices } from "@/services/aiAgentServices";

const agentTypeLabels: Record<string, string> = {
  RESEARCH: "Recherche",
  IMAGE_ANALYSIS: "Analyse d'image",
  TEXT_GENERATION: "Génération de texte",
  OSINT: "OSINT",
  FINE_TUNING: "Fine-tuning",
  HYBRID: "Hybride",
};

const agentStatusColors: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  ACTIVE: "default",
  INACTIVE: "outline",
  RUNNING: "secondary",
  ERROR: "destructive",
};

export default function AgentsPage() {
  const { token, user } = useAuthStore();
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    if (token) {
      loadAgents();
    }
  }, [token]);

  const loadAgents = async () => {
    try {
      const data = await AIAgentServices.getAllAgents(token!, {
        userId: user?.id,
      });
      setAgents(data);
    } catch (error) {
      console.error("Error loading agents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async (agentId: string) => {
    try {
      await AIAgentServices.activateAgent(agentId, token!);
      loadAgents();
    } catch (error) {
      console.error("Error activating agent:", error);
    }
  };

  const handleDeactivate = async (agentId: string) => {
    try {
      await AIAgentServices.deactivateAgent(agentId, token!);
      loadAgents();
    } catch (error) {
      console.error("Error deactivating agent:", error);
    }
  };

  const handleDelete = async (agentId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet agent?")) return;
    try {
      await AIAgentServices.deleteAgent(agentId, token!);
      loadAgents();
    } catch (error) {
      console.error("Error deleting agent:", error);
    }
  };

  const filteredAgents =
    filter === "ALL" ? agents : agents.filter((a: any) => a.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agents IA</h1>
          <p className="text-gray-600">Gérez vos agents autonomes</p>
        </div>
        <Link href="/dashboard/ai-hub/agents/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel Agent
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="ALL" onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="ALL">Tous</TabsTrigger>
          <TabsTrigger value="ACTIVE">Actifs</TabsTrigger>
          <TabsTrigger value="INACTIVE">Inactifs</TabsTrigger>
          <TabsTrigger value="RUNNING">En cours</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          {filteredAgents.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bot className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">Aucun agent trouvé</p>
                <Link href="/dashboard/ai-hub/agents/new">
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Créer votre premier agent
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent: any) => (
                <Card
                  key={agent.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                          <Bot className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {agent.name}
                          </CardTitle>
                          <CardDescription>
                            {agentTypeLabels[agent.agentType] ||
                              agent.agentType}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant={agentStatusColors[agent.status] || "outline"}
                      >
                        {agent.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {agent.description || "Aucune description"}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Settings className="h-4 w-4" />
                      <span>{agent.tasks?.length || 0} tâches</span>
                      <span className="mx-2">•</span>
                      <span>{agent.executions?.length || 0} exécutions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {agent.status === "ACTIVE" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeactivate(agent.id)}
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleActivate(agent.id)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <Link href={`/dashboard/ai-hub/agents/${agent.id}`}>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(agent.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
