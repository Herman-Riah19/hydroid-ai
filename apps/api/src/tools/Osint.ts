import { ScrapingSkill } from "./Scrapping.js";
import {
  IOSINTSkill,
  OsintConfig,
  OsintResult,
  OsintSearchParams,
} from "../types/osintType.js";
import { Logger } from "@tsed/logger";

export class OsintSkill implements IOSINTSkill {
  readonly name = "OsintSkill";
  readonly version = "1.0.0";

  private config: OsintConfig;
  private scrapingSkill: ScrapingSkill;
  private initialized = false;
  private logger: Logger;

  constructor(
    scrapingSkill: ScrapingSkill,
    config: OsintConfig = { enabled: true },
  ) {
    this.config = { defaultSources: ["google", "social"], ...config };
    this.scrapingSkill = scrapingSkill;
    this.logger = new Logger("OsintSkill");
  }

  async initialize(): Promise<void> {
    if (this.config.enabled === false)
      throw new Error("OSINT skill is disabled");
    await this.scrapingSkill.initialize();
    this.initialized = true;
  }

  async dispose(): Promise<void> {
    await this.scrapingSkill.dispose();
    this.initialized = false;
  }

  async execute(params: OsintSearchParams): Promise<OsintResult> {
    return this.search(params);
  }

  async search(params: OsintSearchParams): Promise<OsintResult> {
    this.ensureInitialized();
    const { target, type, sources = this.config.defaultSources ?? [] } = params;

    switch (type) {
      case "person":
        return this.searchPerson(target, sources ?? []);
      case "email":
        return this.searchEmail(target, sources ?? []);
      case "phone":
        return this.searchPhone(target, sources ?? []);
      case "domain":
        return this.searchDomain(target, sources ?? []);
      case "image":
        return this.searchImage(target, sources ?? []);
      case "location":
        return this.searchLocation(target, sources ?? []);
      default:
        return this.createEmptyResult(target, type);
    }
  }

  private createEmptyResult(target: string, type: string): OsintResult {
    return { target, type, findings: {}, confidence: 0, sources: [] };
  }

  private async searchPerson(
    name: string,
    sources: string[],
  ): Promise<OsintResult> {
    const result: OsintResult = this.createEmptyResult(name, "person");
    const queries = [
      `"${name}"`,
      `"${name}" linkedin`,
      `"${name}" twitter`,
      `"${name}" facebook`,
      `"${name}" Instagram`,
    ];

    let allContent = "";
    let allUrls: string[] = [];

    for (const query of queries) {
      try {
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        const data = await this.scrapingSkill.scrape({ url: searchUrl });

        if (data.content) {
          allContent += data.content + "\n";
        }

        const emails = await this.scrapingSkill.extractEmails(
          data.content || "",
        );
        const phones = await this.scrapingSkill.extractPhoneNumbers(
          data.content || "",
        );
        const urls = await this.scrapingSkill.extractUrls(data.content || "");

        result.findings.emails = [...(result.findings.emails || []), ...emails];
        result.findings.phones = [...(result.findings.phones || []), ...phones];
        result.findings.socialProfiles = urls.filter(
          (url) =>
            url.includes("linkedin.com") ||
            url.includes("twitter.com") ||
            url.includes("x.com") ||
            url.includes("facebook.com") ||
            url.includes("instagram.com"),
        );

        allUrls.push(searchUrl);
        result.sources.push(searchUrl);
        result.confidence += 0.2;
      } catch (error) {
        console.error(`Search failed for query: ${query}`, error);
      }
    }

    result.findings.name = name;
    return result;
  }

  private async searchEmail(
    email: string,
    sources: string[],
  ): Promise<OsintResult> {
    const result: OsintResult = this.createEmptyResult(email, "email");
    result.confidence = 0.5;
    const queries = [`"${email}"`, `"${email}" pastebin`, `"${email}" github`];

    for (const query of queries) {
      try {
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        const data = await this.scrapingSkill.scrape({ url: searchUrl });
        result.findings.relatedDomains = await this.scrapingSkill.extractUrls(
          data.content || "",
        );
        result.sources.push(searchUrl);
        result.confidence += 0.2;
      } catch (error) {
        console.error(`Search failed for query: ${query}`, error);
      }
    }

    result.findings.emails = [email];
    return result;
  }

  private async searchPhone(
    phone: string,
    sources: string[],
  ): Promise<OsintResult> {
    const result: OsintResult = this.createEmptyResult(phone, "phone");
    result.confidence = 0.3;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(phone)}`;

    try {
      const data = await this.scrapingSkill.scrape({ url: searchUrl });
      result.findings.relatedDomains = await this.scrapingSkill.extractUrls(
        data.content || "",
      );
      result.sources.push(searchUrl);
    } catch (error) {
      console.error("Phone search failed", error);
    }

    return result;
  }

  private async searchDomain(
    domain: string,
    sources: string[],
  ): Promise<OsintResult> {
    const result: OsintResult = this.createEmptyResult(domain, "domain");
    result.confidence = 0.7;

    try {
      const data = await this.scrapingSkill.scrape({
        url: `https://${domain}`,
      });
      result.findings.metadata = data.metadata;
      result.findings.relatedDomains = data.links?.filter(
        (link) => link.includes(domain) || link.includes("www."),
      );
      const whoisUrl = `https://whois.domaintools.com/${domain}`;
      result.sources.push(whoisUrl);
    } catch (error) {
      console.error("Domain search failed", error);
    }

    return result;
  }

  private async searchImage(
    imageUrl: string,
    sources: string[],
  ): Promise<OsintResult> {
    const result: OsintResult = this.createEmptyResult(imageUrl, "image");
    result.confidence = 0.5;

    const reverseSearchUrls = [
      `https://lens.google.com/uploadbyurl?url=${encodeURIComponent(imageUrl)}`,
      `https://www.tineye.com/search?url=${encodeURIComponent(imageUrl)}`,
    ];

    result.findings.images = [imageUrl];
    result.sources = reverseSearchUrls;
    return result;
  }

  private async searchLocation(
    location: string,
    sources: string[],
  ): Promise<OsintResult> {
    const result: OsintResult = this.createEmptyResult(location, "location");
    result.confidence = 0.6;
    const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(location)}`;

    try {
      const data = await this.scrapingSkill.scrape({ url: searchUrl });
      result.findings.locations = [location];
      result.findings.metadata = data.metadata;
      result.sources.push(searchUrl);
    } catch (error) {
      console.error("Location search failed", error);
    }

    return result;
  }

  async analyzeRisk(profile: {
    name?: string;
    emails?: string[];
    socialProfiles?: string[];
  }): Promise<{
    riskScore: number;
    riskFactors: string[];
    recommendations: string[];
  }> {
    const riskFactors: string[] = [];
    let riskScore = 0;

    if (profile.emails && profile.emails.length > 0) {
      riskFactors.push("Email addresses found");
      riskScore += 0.2;
    }

    if (profile.socialProfiles && profile.socialProfiles.length > 3) {
      riskFactors.push("Multiple social media profiles");
      riskScore += 0.3;
    }

    if (profile.name) {
      const searchResult = await this.search({
        target: profile.name,
        type: "person",
      });
      if (searchResult.confidence > 0.7) {
        riskFactors.push("High visibility online");
        riskScore += 0.3;
      }
    }

    const recommendations: string[] = [];
    if (riskScore > 0.5) {
      recommendations.push("Review privacy settings on social media");
      recommendations.push(
        "Consider removing personal information from public profiles",
      );
    }

    return { riskScore: Math.min(riskScore, 1), riskFactors, recommendations };
  }

  private ensureInitialized(): void {
    if (!this.initialized)
      throw new Error("Skill not initialized. Call initialize() first.");
  }
}
