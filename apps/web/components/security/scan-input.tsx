"use client";

import { Shield, Play, XCircle } from "lucide-react";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";

interface ScanInputProps {
  url: string;
  scanning: boolean;
  onUrlChange: (url: string) => void;
  onScan: () => void;
  onStop: () => void;
}

export function ScanInput({
  url,
  scanning,
  onUrlChange,
  onScan,
  onStop,
}: ScanInputProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Shield className="size-5 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Cible
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              placeholder="https://exemple.com"
              className="w-full border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
              disabled={scanning}
              onKeyDown={(e) => e.key === "Enter" && onScan()}
            />
          </div>
          {scanning ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={onStop}
              className="shrink-0"
            >
              <XCircle className="mr-1.5 size-4" />
              Arrêter
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={onScan}
              disabled={!url.trim()}
              className="shrink-0"
            >
              <Play className="mr-1.5 size-4" />
              Lancer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
