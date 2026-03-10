import { Injectable, OnInit } from "@tsed/di";
import {
  ScrapingSkill,
  OsintSkill,
  LLMSkill,
  ImageGenerationSkill,
  createOllamaLLM,
  createLMStudioLLM,
  createStableDiffusionSkill,
  type IScrapingSkill,
  type IOSINTSkill,
  type ILLMSkill,
  type IOSINTImageSkill,
} from "@hydroid/skills";

export interface SkillFactoryConfig {
  scraping?: { enabled?: boolean; timeout?: number };
  osint?: { enabled?: boolean };
  llm?: {
    provider?: "ollama" | "lmstudio";
    model?: string;
    baseUrl?: string;
    temperature?: number;
    maxTokens?: number;
  };
  imageGeneration?: {
    provider?: "stable-diffusion" | "dall-e";
    baseUrl?: string;
    apiKey?: string;
  };
}

@Injectable()
export class SkillFactory implements OnInit {
  private scrapingSkill: ScrapingSkill | null = null;
  private osintSkill: OsintSkill | null = null;
  private llmSkill: LLMSkill | null = null;
  private imageGenerationSkill: ImageGenerationSkill | null = null;
  private initialized = false;

  async $onInit() {
    await this.initialize();
  }

  async initialize(config?: SkillFactoryConfig): Promise<void> {
    if (this.initialized) return;

    const scraperConfig = config?.scraping ?? { enabled: true };
    this.scrapingSkill = new ScrapingSkill({
      enabled: scraperConfig.enabled ?? true,
      timeout: scraperConfig.timeout ?? 30000,
    });
    await this.scrapingSkill.initialize();

    const osintConfig = config?.osint ?? { enabled: true };
    this.osintSkill = new OsintSkill(this.scrapingSkill, {
      enabled: osintConfig.enabled ?? true,
    });
    await this.osintSkill.initialize();

    const llmConfig = config?.llm ?? {};
    if (llmConfig.provider === "lmstudio") {
      this.llmSkill = createLMStudioLLM(
        llmConfig.model ?? "qwen2.5:14b",
        llmConfig.baseUrl ?? "http://localhost:1234/v1",
      );
    } else {
      this.llmSkill = createOllamaLLM(llmConfig.model ?? "qwen2.5:14b");
    }
    await this.llmSkill.initialize();

    const imageConfig = config?.imageGeneration ?? {};
    if (imageConfig.provider === "stable-diffusion") {
      this.imageGenerationSkill = createStableDiffusionSkill(
        imageConfig.baseUrl ?? "http://localhost:7860",
      );
    } else {
      this.imageGenerationSkill = new ImageGenerationSkill({
        provider: imageConfig.provider ?? "stable-diffusion",
        baseUrl: imageConfig.baseUrl ?? "http://localhost:7860",
        enabled: true,
      });
    }
    await this.imageGenerationSkill.initialize();

    this.initialized = true;
  }

  async dispose(): Promise<void> {
    await this.scrapingSkill?.dispose();
    await this.osintSkill?.dispose();
    await this.llmSkill?.dispose();
    await this.imageGenerationSkill?.dispose();
    this.initialized = false;
  }

  get scraping(): IScrapingSkill {
    if (!this.scrapingSkill) {
      throw new Error("Scraping skill not initialized");
    }
    return this.scrapingSkill;
  }

  get osint(): IOSINTSkill {
    if (!this.osintSkill) {
      throw new Error("OSINT skill not initialized");
    }
    return this.osintSkill;
  }

  get llm(): ILLMSkill {
    if (!this.llmSkill) {
      throw new Error("LLM skill not initialized");
    }
    return this.llmSkill;
  }

  get imageGeneration(): IOSINTImageSkill {
    if (!this.imageGenerationSkill) {
      throw new Error("Image generation skill not initialized");
    }
    return this.imageGenerationSkill;
  }

  get isInitialized(): boolean {
    return this.initialized;
  }
}
