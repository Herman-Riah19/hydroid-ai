import axios, { AxiosInstance } from "axios";
import * as cheerio from "cheerio";
import {
  IScrapingSkill,
  ScrapedData,
  ScrapingConfig,
  ScrapingOptions,
} from "../types/scrappingType.js";

export class ScrapingSkill implements IScrapingSkill {
  readonly name = "ScrapingSkill";
  readonly version = "1.0.0";

  private config: ScrapingConfig;
  private client: AxiosInstance | null = null;
  private initialized = false;

  constructor(config: ScrapingConfig = { enabled: true }) {
    this.config = {
      timeout: 30000,
      defaultHeaders: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      ...config,
    };
  }

  async initialize(): Promise<void> {
    if (this.config.enabled === false) {
      throw new Error("Scraping skill is disabled");
    }
    this.client = axios.create({
      timeout: this.config.timeout,
      headers: this.config.defaultHeaders,
    });
    this.initialized = true;
  }

  async dispose(): Promise<void> {
    this.client = null;
    this.initialized = false;
  }

  async execute(options: ScrapingOptions): Promise<ScrapedData> {
    return this.scrape(options);
  }

  async scrape(options: ScrapingOptions): Promise<ScrapedData> {
    this.ensureInitialized();

    const {
      url,
      selector,
      attributes = ["text"],
      limit = 10,
      headers = {},
    } = options;

    const response = await this.client!.get(url, {
      headers: { ...this.config.defaultHeaders, ...headers },
    });
    const $ = cheerio.load(response.data);

    const result: ScrapedData = {
      url,
      title: $("title").text(),
      rawHtml: $.html(),
    };

    if (selector) {
      const elements = $(selector).slice(0, limit);
      const contents: string[] = [];

      elements.each((_, el) => {
        for (const attr of attributes) {
          if (attr === "text") contents.push($(el).text().trim());
          else if (attr === "html") contents.push($.html(el) || "");
          else contents.push($(el).attr(attr) || "");
        }
      });

      result.content = contents.join("\n");
    }

    result.links = $("a[href]")
      .map((_, el) => $(el).attr("href"))
      .get()
      .slice(0, limit);
    result.images = $("img[src]")
      .map((_, el) => $(el).attr("src"))
      .get()
      .slice(0, limit);
    result.metadata = {
      description: $('meta[name="description"]').attr("content") || "",
      keywords: $('meta[name="keywords"]').attr("content") || "",
      author: $('meta[name="author"]').attr("content") || "",
    };

    return result;
  }

  async scrapeMultiple(
    urls: string[],
    options?: Partial<ScrapingOptions>,
  ): Promise<ScrapedData[]> {
    const results: ScrapedData[] = [];
    for (const url of urls) {
      try {
        const data = await this.scrape({ url, ...options });
        results.push(data);
      } catch (error) {
        console.error(`Failed to scrape ${url}:`, error);
      }
    }
    return results;
  }

  async extractEmails(text: string): Promise<string[]> {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    return text.match(emailRegex) || [];
  }

  async extractPhoneNumbers(text: string): Promise<string[]> {
    const phoneRegex =
      /(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})/g;
    return text.match(phoneRegex) || [];
  }

  async extractUrls(text: string): Promise<string[]> {
    const urlRegex = /https?:\/\/[^\s]+/g;
    return text.match(urlRegex) || [];
  }

  async socialMediaScrape(url: string): Promise<{
    platform?: string;
    username?: string;
    posts?: number;
    followers?: number;
    following?: number;
  }> {
    const result: { platform?: string; username?: string } = {};

    if (url.includes("twitter.com") || url.includes("x.com")) {
      result.platform = "twitter";
      const usernameMatch = url.match(/(?:twitter\.com|x\.com)\/([^\/]+)/);
      result.username = usernameMatch?.[1];
    } else if (url.includes("instagram.com")) {
      result.platform = "instagram";
      const usernameMatch = url.match(/instagram\.com\/([^\/]+)/);
      result.username = usernameMatch?.[1];
    } else if (url.includes("linkedin.com")) {
      result.platform = "linkedin";
      const usernameMatch = url.match(/linkedin\.com\/in\/([^\/]+)/);
      result.username = usernameMatch?.[1];
    }

    return result;
  }

  private ensureInitialized(): void {
    if (!this.initialized)
      throw new Error("Skill not initialized. Call initialize() first.");
  }
}

export function createScrapingSkill(config?: ScrapingConfig): ScrapingSkill {
  return new ScrapingSkill(config);
}
