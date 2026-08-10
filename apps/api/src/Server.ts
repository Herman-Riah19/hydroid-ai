import { join } from "node:path";
import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/platform-http";
import "@tsed/platform-log-request"; // remove this import if you don&#x27;t want log request
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import "@tsed/swagger";
import { config } from "./config/index.js";
import * as rest from "./controllers/index.js";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import methodOverride from "method-override";
import "@tsed/sse";

@Configuration({
  ...config,
  acceptMimes: ["application/json", "text/event-stream"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  swagger: [
    {
      path: "/v1/api-docs",
      doc: "api-docs",
    },
  ],
  mount: {
    "/api": [...Object.values(rest)],
  },
  middlewares: [
    "cookie-parser",
    "method-override",
    "json-parser",
    { use: "urlencoded-parser", options: { extended: true } },
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs",
    },
  },
})
export class Server {
  @Inject()
  app!: PlatformApplication;

  @Configuration()
  settings!: Configuration;

  $beforeRoutesInit(): void {
    this.app
      // 1. Configuration CORS explicite pour votre Next.js (port 3000 ou 3001)
      .use(
        cors({
          // Autorise localhost ET toutes les adresses IP locales en dev
          origin: (origin, callback) => {
            // Permet les requêtes sans origine (comme Postman) ou n'importe quel port local/IP
            if (!origin || origin.includes("localhost") || origin.includes("10.23.0.216") || origin.includes("127.0.0.1")) {
              callback(null, true);
            } else {
              callback(new Error("Bloqué par CORS"));
            }
          },
          credentials: true,
        })
      )
      .use(cookieParser())
      .use(compress({
        filter: (req, res) => {
          if (req.headers.accept === "text/event-stream") {
            return false; // Ne pas compresser si c'est du SSE
          }
          return compress.filter(req, res);
        }
      }))
      .use(methodOverride());
  }
}
