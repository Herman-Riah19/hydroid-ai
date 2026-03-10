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
  Brain,
  Plus,
  Play,
  Square,
  Trash2,
  Loader2,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import {
  FineTuneJobServices,
  AIModelServices,
} from "@/services/fineTuneServices";

const jobStatusColors: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  PENDING: "outline",
  PREPARING: "secondary",
  TRAINING: "default",
  VALIDATING: "secondary",
  COMPLETED: "default",
  FAILED: "destructive",
  CANCELLED: "outline",
};

export default function FineTuningPage() {
  const { token, user } = useAuthStore();
  const [jobs, setJobs] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  const loadData = async () => {
    try {
      const [jobsData, modelsData] = await Promise.all([
        FineTuneJobServices.getAllFineTuneJobs(token!),
        AIModelServices.getAllModels(token!),
      ]);
      setJobs(jobsData);
      setModels(modelsData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStart = async (jobId: string) => {
    try {
      await FineTuneJobServices.startFineTuneJob(jobId, token!);
      loadData();
    } catch (error) {
      console.error("Error starting job:", error);
    }
  };

  const handleCancel = async (jobId: string) => {
    try {
      await FineTuneJobServices.cancelFineTuneJob(jobId, token!);
      loadData();
    } catch (error) {
      console.error("Error cancelling job:", error);
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette tâche?")) return;
    try {
      await FineTuneJobServices.deleteFineTuneJob(jobId, token!);
      loadData();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const filteredJobs =
    filter === "ALL" ? jobs : jobs.filter((j: any) => j.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "FAILED":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "TRAINING":
        return <Loader2 className="h-4 w-4 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Fine-tuning</h1>
          <p className="text-gray-600">Entraînez vos propres modèles IA</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/ai-hub/fine-tuning/models">
            <Button variant="outline">
              <Brain className="mr-2 h-4 w-4" />
              Modèles
            </Button>
          </Link>
          <Link href="/dashboard/ai-hub/fine-tuning/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Job
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Modèles disponibles
                </p>
                <p className="text-2xl font-bold">{models.length}</p>
              </div>
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Jobs en cours
                </p>
                <p className="text-2xl font-bold">
                  {jobs.filter((j: any) => j.status === "TRAINING").length}
                </p>
              </div>
              <Loader2 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Jobs terminés
                </p>
                <p className="text-2xl font-bold">
                  {jobs.filter((j: any) => j.status === "COMPLETED").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ALL" onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="ALL">Tous</TabsTrigger>
          <TabsTrigger value="PENDING">En attente</TabsTrigger>
          <TabsTrigger value="TRAINING">En cours</TabsTrigger>
          <TabsTrigger value="COMPLETED">Terminés</TabsTrigger>
          <TabsTrigger value="FAILED">Échoués</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          {filteredJobs.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Brain className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">
                  Aucun job de fine-tuning trouvé
                </p>
                <Link href="/dashboard/ai-hub/fine-tuning/new">
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Créer votre premier job
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job: any) => (
                <Card
                  key={job.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(job.status)}
                        <div>
                          <p className="font-medium">{job.name}</p>
                          <p className="text-sm text-gray-500">
                            Modèle: {job.baseModel} • Époques: {job.epochs}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={jobStatusColors[job.status] || "outline"}
                        >
                          {job.status}
                        </Badge>
                        {job.status === "PENDING" && (
                          <Button size="sm" onClick={() => handleStart(job.id)}>
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        {(job.status === "PENDING" ||
                          job.status === "TRAINING") && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancel(job.id)}
                          >
                            <Square className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-500"
                          onClick={() => handleDelete(job.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
