import type { HttpResponseInfo, ScannerConfig } from "./types.js";

export class HttpClient {
  private defaultConfig: Required<ScannerConfig>;

  constructor(config: ScannerConfig = {}) {
    this.defaultConfig = {
      timeout: config.timeout ?? 10000,
      followRedirects: config.followRedirects ?? true,
      userAgent: config.userAgent ?? "HydroidSecurityScanner/1.0",
      concurrentRequests: config.concurrentRequests ?? 5,
    };
  }

  get config(): Required<ScannerConfig> {
    return this.defaultConfig;
  }

  async request(
    url: string,
    options: {
      method?: string;
      headers?: Record<string, string>;
      body?: string;
    } = {},
  ): Promise<HttpResponseInfo> {
    const startTime = performance.now();

    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      this.defaultConfig.timeout,
    );

    try {
      const response = await fetch(url, {
        method: options.method ?? "GET",
        headers: {
          "User-Agent": this.defaultConfig.userAgent,
          ...options.headers,
        },
        body: options.body,
        signal: controller.signal,
        redirect: this.defaultConfig.followRedirects ? "follow" : "manual",
      });

      const body = await response.text();

      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key.toLowerCase()] = value;
      });

      return {
        url: response.url,
        statusCode: response.status,
        headers,
        bodyLength: body.length,
        responseTime: Math.round(performance.now() - startTime),
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async requestRaw(
    url: string,
    options: {
      method?: string;
      headers?: Record<string, string>;
      body?: string;
    } = {},
  ): Promise<{ response: HttpResponseInfo; body: string }> {
    const startTime = performance.now();
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      this.defaultConfig.timeout,
    );

    try {
      const response = await fetch(url, {
        method: options.method ?? "GET",
        headers: {
          "User-Agent": this.defaultConfig.userAgent,
          ...options.headers,
        },
        body: options.body,
        signal: controller.signal,
        redirect: this.defaultConfig.followRedirects ? "follow" : "manual",
      });

      const body = await response.text();

      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key.toLowerCase()] = value;
      });

      return {
        response: {
          url: response.url,
          statusCode: response.status,
          headers,
          bodyLength: body.length,
          responseTime: Math.round(performance.now() - startTime),
        },
        body,
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
