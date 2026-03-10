import "reflect-metadata";
import { $log } from "@tsed/logger";
import { PlatformExpress } from "@tsed/platform-express";
import { Server } from "./Server";
import {
  initDataSource,
  closeDataSource,
} from "./datasources/AppDataSource.js";

const SIG_EVENTS = [
  "beforeExit",
  "SIGHUP",
  "SIGINT",
  "SIGQUIT",
  "SIGILL",
  "SIGTRAP",
  "SIGABRT",
  "SIGBUS",
  "SIGFPE",
  "SIGUSR1",
  "SIGSEGV",
  "SIGUSR2",
  "SIGTERM",
];

(async () => {
  try {
    await initDataSource();

    const platform = await PlatformExpress.bootstrap(Server);
    await platform.listen();

    SIG_EVENTS.forEach((evt) =>
      process.on(evt, async () => {
        await closeDataSource();
        await platform.stop();
      }),
    );

    ["uncaughtException", "unhandledRejection"].forEach((evt) =>
      process.on(evt, async (error: any) => {
        $log.error({
          event: "SERVER_" + evt.toUpperCase(),
          message: error.message,
          stack: error.stack,
        });
        await closeDataSource();
        await platform.stop();
      }),
    );
  } catch (error: any) {
    $log.error({
      event: "SERVER_BOOTSTRAP_ERROR",
      message: error.message,
      stack: error.stack,
    });
  }
})();
