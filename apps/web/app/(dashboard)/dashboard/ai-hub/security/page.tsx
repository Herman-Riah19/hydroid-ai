import { ShieldCheck } from "lucide-react";
import { AiHubEmptyState } from "@/components/ai-hub/ai-hub-empty-state";

export default function SecurityPage() {
  return (
    <AiHubEmptyState
      icon={ShieldCheck}
      title="Sécurité avancée"
      description="Analysez vos modèles et agents avec des garde-fous de sécurité avancés. Cette fonctionnalité arrive bientôt."
      status="À venir"
      accent="secondary"
    />
  );
}
