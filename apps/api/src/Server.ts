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

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
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
    "cors",
    "cookie-parser",
    "compression",
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
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride());
  }
}
