"use client";

import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@repo/ui/components/ui/card";

export function ScanLoading() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <Loader2 className="mb-3 size-8 animate-spin text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">Scan en cours...</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Analyse des modules de sécurité
        </p>
      </CardContent>
    </Card>
  );
}
