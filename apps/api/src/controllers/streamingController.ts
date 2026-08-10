import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";
import { Docs } from "@tsed/swagger";
import { Logger } from "@tsed/logger";
import { Readable } from "node:stream";

export interface ScanDataPayload {
  id: string;
  status: "pending" | "scanning" | "completed";
  progress: number;
  message: string;
  timestamp: string;
}

@Controller("/streaming")
@Docs("api-docs")
export class StreamingController {
  constructor(private readonly logger: Logger) {}

  @Get("/sse")
  streamChunks(): Readable {
    this.logger.info("Début du stream HTTP chunked");

    let progress = 0;

    // Stream Readable natif
    const stream = new Readable({
      read() {}
    });

    const intervalId = setInterval(() => {
      progress = Math.min(progress + 10, 100);

      const payload: ScanDataPayload = {
        id: "scan_12345",
        status: progress === 100 ? "completed" : "scanning",
        progress,
        message: `Analyse en cours... ${progress}%`,
        timestamp: new Date().toISOString()
      };

      this.logger.info(`Push chunk: ${payload.message}`);

      // On pousse le JSON suivi d'un saut de ligne (\n)
      stream.push(`${JSON.stringify(payload)}\n`);

      if (progress === 100) {
        clearInterval(intervalId);
        stream.push(null); // Termine le flux proprement
      }
    }, 1000);

    stream.on("close", () => {
      this.logger.info("Client déconnecté, arrêt du timer");
      clearInterval(intervalId);
    });

    return stream;
  }
}