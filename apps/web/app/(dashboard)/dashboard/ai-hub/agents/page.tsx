import { Bot } from "lucide-react";
import { AiHubEmptyState } from "@/components/ai-hub/ai-hub-empty-state";

export default function AgentsPage() {
  return (
    <AiHubEmptyState
      icon={Bot}
      title="Agents IA"
      description="Créez et gérez vos agents d'analyse propulsés par l'intelligence artificielle. Cette fonctionnalité arrive bientôt."
      status="À venir"
    />
  );
}
