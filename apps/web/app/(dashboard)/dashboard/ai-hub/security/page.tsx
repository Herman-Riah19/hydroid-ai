"use client";

import { useState, useCallback, useRef } from "react";
import {
  Shield,
  Play,
  AlertTriangle,
  Bug,
  Globe,
  XCircle,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { SecurityServices } from "@/services/securityServices";
import { SecurityTerminal } from "@/components/security/terminal";
import { VulnerabilityCard } from "@/components/security/vulnerability-card";
import type { ScanResult, ScanEvent } from "@/services/securityServices";

interface LogEntry {
  type: string;
  message: string;
  timestamp: string;
}

function fmtTime() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`;
}

const SEVERITY_ICONS: Record<string, React.ElementType> = {
  critical: XCircle,
  high: AlertTriangle,
  medium: Bug,
  low: Globe,
  info: Globe,
};

const SEVERITY_COLORS: Record<string, string> = {
  critical: "text-red-400 border-red-900/50 bg-red-950/20",
  high: "text-orange-400 border-orange-900/50 bg-orange-950/20",
  medium: "text-yellow-400 border-yellow-900/50 bg-yellow-950/20",
  low: "text-gray-400 border-gray-800 bg-gray-900/50",
  info: "text-gray-500 border-gray-800 bg-gray-900/30",
};

export default function SecurityPage() {
  const { token } = useAuthStore();
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeTab, setActiveTab] = useState("all" as string);
  const esRef = useRef<EventSource | null>(null);

  const handleScan = useCallback(async () => {
    if (!url.trim() || !token) return;

    setScanning(true);
    setResult(null);
    setLogs([]);
    setActiveTab("all");

    const es = SecurityServices.streamScan(url.trim(), token);
    esRef.current = es;

    es.addEventListener("connected", (e: MessageEvent) => {
      const data = JSON.parse(e.data) as ScanEvent;
      setLogs((prev) => [
        ...prev,
        { type: data.type, message: data.message, timestamp: fmtTime() },
      ]);
    });

    const eventTypes = [
      "init",
      "scan-start",
      "scan-ok",
      "scan-vulns",
      "scan-error",
      "info",
    ];
    for (const et of eventTypes) {
      es.addEventListener(et, (e: MessageEvent) => {
        const data = JSON.parse(e.data) as ScanEvent;
        setLogs((prev) => [
          ...prev,
          { type: data.type, message: data.message, timestamp: fmtTime() },
        ]);
      });
    }

    es.addEventListener("complete", (e: MessageEvent) => {
      const data = JSON.parse(e.data) as ScanEvent & { data: ScanResult };
      setLogs((prev) => [
        ...prev,
        { type: "complete", message: data.message, timestamp: fmtTime() },
      ]);
      setResult(data.data);
      setScanning(false);
      es.close();
    });

    es.addEventListener("error", (e: MessageEvent) => {
      const data = JSON.parse(e.data) as ScanEvent;
      setLogs((prev) => [
        ...prev,
        { type: "error", message: data.message, timestamp: fmtTime() },
      ]);
      setScanning(false);
      es.close();
    });

    es.onerror = () => {
      setLogs((prev) => [
        ...prev,
        {
          type: "error",
          message: "Connexion perdue avec le serveur",
          timestamp: fmtTime(),
        },
      ]);
      setScanning(false);
      es.close();
    };
  }, [url, token]);

  const handleStop = useCallback(() => {
    esRef.current?.close();
    setScanning(false);
    setLogs((prev) => [
      ...prev,
      {
        type: "info",
        message: "Scan interrompu par l'utilisateur",
        timestamp: fmtTime(),
      },
    ]);
  }, []);

  const filteredVulns = result?.vulnerabilities?.filter((v) =>
    activeTab === "all" ? true : v.severity === activeTab,
  ) ?? [];

  const summary = result?.summary;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Security Scanner</h1>
          <p className="text-sm text-gray-500">
            Analyse de sécurité automatisée pour applications web
          </p>
        </div>
      </div>

      {/* URL Input */}
      <Card className="border-gray-800 bg-gray-900/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-800">
              <Shield className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 block">
                Cible
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://exemple.com"
                className="w-full bg-transparent border-0 outline-none text-sm text-gray-100 placeholder:text-gray-600"
                disabled={scanning}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
              />
            </div>
            {scanning ? (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleStop}
                className="shrink-0"
              >
                <XCircle className="h-4 w-4 mr-1.5" />
                Arrêter
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleScan}
                disabled={!url.trim()}
                className="shrink-0"
              >
                <Play className="h-4 w-4 mr-1.5" />
                Lancer le scan
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main grid: Terminal + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Terminal - takes 2/5 on large screens */}
        <div className="lg:col-span-2">
          <SecurityTerminal
            logs={logs}
            className="h-[calc(100vh-320px)] min-h-[400px]"
          />
        </div>

        {/* Results - takes 3/5 on large screens */}
        <div className="lg:col-span-3 space-y-4">
          {scanning && (
            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-3" />
                <p className="text-sm font-medium text-gray-300">
                  Scan en cours...
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Analyse des modules de sécurité
                </p>
              </CardContent>
            </Card>
          )}

          {result && summary && (
            <>
              {/* Summary badges */}
              <div className="grid grid-cols-5 gap-2">
                {(["critical", "high", "medium", "low", "info"] as const).map(
                  (sev) => {
                    const count = summary[sev];
                    const Icon = SEVERITY_ICONS[sev]!;
                    return (
                      <button
                        key={sev}
                        onClick={() =>
                          setActiveTab(activeTab === sev ? "all" : sev)
                        }
                        className={`flex flex-col items-center gap-1 rounded-lg border p-3 transition-all cursor-pointer ${SEVERITY_COLORS[sev]
                          } ${activeTab === sev ? "ring-1 ring-gray-500" : "opacity-60 hover:opacity-100"}`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-lg font-bold tabular-nums">
                          {count}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider">
                          {sev}
                        </span>
                      </button>
                    );
                  },
                )}
              </div>

              {/* Vulnerability list */}
              <div className="space-y-2 max-h-[calc(100vh-500px)] overflow-y-auto pr-1">
                {filteredVulns.length === 0 ? (
                  <Card className="border-gray-800 bg-gray-900/30">
                    <CardContent className="p-8 text-center">
                      <Shield className="h-8 w-8 text-green-500/60 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Aucune vulnérabilité{" "}
                        {activeTab !== "all" ? activeTab : ""} trouvée
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredVulns.map((vuln) => (
                    <VulnerabilityCard key={vuln.id} vuln={vuln} />
                  ))
                )}
              </div>
            </>
          )}

          {!result && !scanning && (
            <Card className="border-gray-800 bg-gray-900/30 h-full">
              <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                <Shield className="h-12 w-12 text-gray-700 mb-4" />
                <p className="text-sm text-gray-500 font-medium">
                  En attente d&apos;un scan
                </p>
                <p className="text-xs text-gray-600 mt-1 max-w-sm">
                  Entrez l&apos;URL de votre cible et lancez un scan pour
                  détecter les vulnérabilités
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
