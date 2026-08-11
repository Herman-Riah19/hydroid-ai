import { SlidersHorizontal } from "lucide-react";
import { AiHubEmptyState } from "@/components/ai-hub/ai-hub-empty-state";

export default function FineTuningPage() {
  return (
    <AiHubEmptyState
      icon={SlidersHorizontal}
      title="Fine-tuning"
      description="Configurez et affinez vos modèles d'IA pour des analyses plus précises. Cette fonctionnalité arrive bientôt."
      status="À venir"
      accent="secondary"
    />
  );
}
