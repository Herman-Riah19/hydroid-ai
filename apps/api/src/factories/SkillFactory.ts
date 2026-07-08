import { Injectable, OnInit } from "@tsed/di";
import { WebScanner, createWebScanner } from "src/tools/WebScanner.js";
import {
  VulnerabilityAnalyzer,
  createVulnerabilityAnalyzer,
} from "src/tools/VulnerabilityAnalyzer.js";
import {
  SQLInjectionTester,
  createSQLInjectionTester,
} from "src/tools/SQLInjectionTester.js";
import { LLMSkill } from "src/tools/LLM.js";
import { ILLMSkill } from "src/types/LLMType.js";

export interface SkillFactoryConfig {
  scanner?: { timeout?: number; concurrentRequests?: number };
  llm?: {
    provider?: "ollama" | "lmstudio";
    model?: string;
    baseUrl?: string;
    temperature?: number;
    maxTokens?: number;
  };
}

@Injectable()
export class SkillFactory implements OnInit {
  private webScanner: WebScanner | null = null;
  private vulnAnalyzer: VulnerabilityAnalyzer | null = null;
  private sqliTester: SQLInjectionTester | null = null;
  private llmSkill: LLMSkill | null = null;
  private initialized = false;

  async $onInit() {
    await this.initialize();
  }

  async initialize(config?: SkillFactoryConfig): Promise<void> {
    if (this.initialized) return;

    this.webScanner = createWebScanner({
      timeout: config?.scanner?.timeout ?? 30000,
      concurrentRequests: config?.scanner?.concurrentRequests ?? 5,
    });
    await this.webScanner.initialize();

    this.vulnAnalyzer = createVulnerabilityAnalyzer();
    await this.vulnAnalyzer.initialize();

    this.sqliTester = createSQLInjectionTester();
    await this.sqliTester.initialize();

    const llmConfig = config?.llm ?? {};
    this.llmSkill = new LLMSkill({
      provider: llmConfig.provider ?? "ollama",
      model: llmConfig.model ?? "qwen2.5:14b",
      baseUrl: llmConfig.baseUrl ?? "http://localhost:11434",
      enabled: true,
      ...llmConfig,
    });
    await this.llmSkill.initialize();

    this.initialized = true;
  }

  async dispose(): Promise<void> {
    await this.webScanner?.dispose();
    await this.vulnAnalyzer?.dispose();
    await this.sqliTester?.dispose();
    await this.llmSkill?.dispose();
    this.initialized = false;
  }

  get scanner(): WebScanner {
    if (!this.webScanner) throw new Error("WebScanner not initialized");
    return this.webScanner;
  }

  get getVulnAnalyzer(): VulnerabilityAnalyzer {
    if (!this.vulnAnalyzer)
      throw new Error("VulnerabilityAnalyzer not initialized");
    return this.vulnAnalyzer;
  }

  get getSqliTester(): SQLInjectionTester {
    if (!this.sqliTester) throw new Error("SQLInjectionTester not initialized");
    return this.sqliTester;
  }

  get llm(): ILLMSkill {
    if (!this.llmSkill) throw new Error("LLM skill not initialized");
    return this.llmSkill;
  }

  get isInitialized(): boolean {
    return this.initialized;
  }
}
