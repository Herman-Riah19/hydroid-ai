"use client";

import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@repo/ui/components/ui/card";

export function ScanLoading() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <Loader2 className="mb-3 size-8 animate-spin text-primary" />
        <p className="text-sm font-semibold text-foreground">
          Scan en cours...
        </p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          $ hydroid scan --modules security,headers
        </p>
      </CardContent>
    </Card>
  );
}
