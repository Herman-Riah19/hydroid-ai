import { ISkill, ISkillExecutor, ISkillConfig } from "./SkillbaseType.js";
    
export interface ScrapingOptions {
  url: string;
  selector?: string;
  attributes?: string[];
  limit?: number;
  headers?: Record<string, string>;
}

export interface ScrapingConfig extends ISkillConfig {
  defaultHeaders?: Record<string, string>;
  timeout?: number;
}

export interface ScrapedData {
  url: string;
  title?: string;
  content?: string;
  links?: string[];
  images?: string[];
  metadata?: Record<string, string>;
  rawHtml?: string;
}

export interface IScrapingSkill
  extends ISkill, ISkillExecutor<ScrapingOptions, ScrapedData> {
  scrape(options: ScrapingOptions): Promise<ScrapedData>;
  scrapeMultiple(
    urls: string[],
    options?: Partial<ScrapingOptions>,
  ): Promise<ScrapedData[]>;
  extractEmails(text: string): Promise<string[]>;
  extractPhoneNumbers(text: string): Promise<string[]>;
  extractUrls(text: string): Promise<string[]>;
  socialMediaScrape(url: string): Promise<{
    platform?: string;
    username?: string;
    posts?: number;
    followers?: number;
    following?: number;
  }>;
}