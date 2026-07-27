"use client";

import { useState, useCallback, useRef } from "react";
import { useAuthStore } from "@/store/auth-store";
import { SecurityServices } from "@/services/securityServices";
import { SecurityTerminal } from "@/components/security/terminal";
import { ScanInput } from "@/components/security/scan-input";
import { ScanLoading } from "@/components/security/scan-loading";
import { SeverityFilter } from "@/components/security/severity-filter";
import { VulnerabilityList } from "@/components/security/vulnerability-list";
import { ScanPlaceholder } from "@/components/security/scan-placeholder";
import { AiAnalysisCard } from "@/components/security/ai-analysis-card";
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

    const addLog = (type: string, message: string) => {
      setLogs((prev) => [...prev, { type, message, timestamp: fmtTime() }]);
    };

    es.addEventListener("connected", (e: MessageEvent) => {
      const data = JSON.parse(e.data) as ScanEvent;
      addLog(data.type, data.message);
    });

    const progressEvents = [
      "init",
      "scan-start",
      "scan-ok",
      "scan-vulns",
      "scan-error",
      "info",
    ];
    for (const et of progressEvents) {
      es.addEventListener(et, (e: MessageEvent) => {
        const data = JSON.parse(e.data) as ScanEvent;
        addLog(data.type, data.message);
      });
    }

    es.addEventListener("complete", (e: MessageEvent) => {
      const data = JSON.parse(e.data) as ScanEvent & { data: ScanResult };
      addLog("complete", data.message);
      setResult(data.data);
      setScanning(false);
      es.close();
    });

    es.addEventListener("error", (e: MessageEvent) => {
      const data = JSON.parse(e.data) as ScanEvent;
      addLog("error", data.message);
      setScanning(false);
      es.close();
    });

    es.onerror = () => {
      addLog("error", "Connexion perdue avec le serveur");
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

  const filteredVulns =
    result?.vulnerabilities?.filter((v) =>
      activeTab === "all" ? true : v.severity === activeTab,
    ) ?? [];

  const summary = result?.summary;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Security Scanner
          </h1>
          <p className="text-sm text-muted-foreground">
            Analyse de sécurité automatisée pour applications web
          </p>
        </div>
      </div>

      <ScanInput
        url={url}
        scanning={scanning}
        onUrlChange={setUrl}
        onScan={handleScan}
        onStop={handleStop}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SecurityTerminal logs={logs} className="h-full min-h-100" />
        </div>

        <div className="space-y-4 lg:col-span-3 h-auto">
          {scanning && <ScanLoading />}

          {result && summary && (
            <>
              <SeverityFilter
                summary={summary}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
              <VulnerabilityList
                vulnerabilities={filteredVulns}
                activeTab={activeTab}
              />
              {result.aiAnalysis && (
                <AiAnalysisCard analysis={result.aiAnalysis} />
              )}
            </>
          )}

          {!result && !scanning && <ScanPlaceholder />}
        </div>
      </div>
    </div>
  );
}
