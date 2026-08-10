'use client';

import { useEffect, useState } from 'react';

interface ScanDataPayload {
  id: string;
  status: 'pending' | 'scanning' | 'completed';
  progress: number;
  message: string;
  timestamp: string;
}

export function SSEComponent() {
  const [logs, setLogs] = useState<ScanDataPayload[]>([]);
  const [status, setStatus] = useState<string>('INIT');

  useEffect(() => {
    const controller = new AbortController();

    async function connectStream() {
      try {
        setStatus('CONNECTING');
        
        // 🔑 Utilisation de fetch au lieu de EventSource
        const response = await fetch('http://localhost:8083/api/streaming/sse', {
          signal: controller.signal
        });

        if (!response.ok || !response.body) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        setStatus('CONNECTED');

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            setStatus('COMPLETED');
            break;
          }

          // Décodage du chunk reçu
          buffer += decoder.decode(value, { stream: true });

          // Découpage par ligne (\n)
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Conserve la ligne incomplète si nécessaire

          for (const line of lines) {
            if (line.trim()) {
              try {
                const parsedData: ScanDataPayload = JSON.parse(line);
                console.log('📩 Chunk reçu :', parsedData);
                setLogs((prev) => [...prev, parsedData]);
              } catch (e) {
                console.error('Erreur parsing JSON chunk :', e);
              }
            }
          }
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('❌ Erreur Stream Fetch :', err);
          setStatus('ERROR');
        }
      }
    }

    connectStream();

    return () => {
      console.log('🔌 Fermeture du stream Fetch');
      controller.abort();
    };
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto bg-slate-900 text-white rounded-xl shadow-md font-mono">
      <h2 className="text-lg font-bold mb-2">
        Statut : <span className={status === 'CONNECTED' ? 'text-green-400' : 'text-amber-400'}>{status}</span>
      </h2>

      <div className="space-y-2 mt-4 overflow-y-auto">
        {logs.length === 0 ? (
          <p className="text-gray-400 text-sm">En attente de données...</p>
        ) : (
          logs.map((item, index) => (
            <div key={index} className="p-3 bg-slate-800 rounded border border-slate-700">
              <div className="flex justify-between text-xs text-slate-400">
                <span>ID: {item.id}</span>
                <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
              </div>
              <p className="text-emerald-400 font-semibold mt-1">{item.message}</p>
              <div className="w-full bg-slate-700 h-2 rounded mt-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-150"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}