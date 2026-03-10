import { ISkillExecutor } from "src/types/SkillbaseType.js";
import { ILLMSkill, ChatMessage, LLMConfig } from "src/types/LLMType.js";

export class LLMSkill implements ILLMSkill, ISkillExecutor<ChatMessage[], string> {
  readonly name = "LLMSkill";
  readonly version = "1.0.0";

  private config: LLMConfig;
  private initialized = false;

  constructor(config: LLMConfig) {
    this.config = config;
  }

  async initialize(): Promise<void> {
    if (this.config.enabled === false) {
      throw new Error("LLM skill is disabled");
    }
    this.initialized = true;
  }

  async dispose(): Promise<void> {
    this.initialized = false;
  }

  async execute(messages: ChatMessage[]): Promise<string> {
    return this.chat(messages);
  }

  private getBaseUrl(): string {
    if (this.config.provider === "ollama") {
      return this.config.baseUrl || "http://localhost:11434";
    }
    return this.config.baseUrl || "http://localhost:1234/v1";
  }

  async chat(messages: ChatMessage[]): Promise<string> {
    this.ensureInitialized();

    const { isOllama, response } = await this.getResponseByApi(messages);

    const data = (await response.json()) as Record<string, unknown>;
    return isOllama
      ? String((data.message as Record<string, unknown>)?.content ?? "")
      : String(
          ((data.choices as Array<{ message: { content: string } }>) ?? [])[0]
            ?.message?.content ?? "",
        );
  }

  async generate(prompt: string): Promise<string> {
    return this.chat([{ role: "user", content: prompt }]);
  }

  async embed(text: string): Promise<number[]> {
    this.ensureInitialized();

    const isOllama = this.config.provider === "ollama";
    const url = isOllama
      ? `${this.getBaseUrl()}/api/embeddings`
      : `${this.getBaseUrl()}/embeddings`;

    const body = isOllama
      ? { model: this.config.model, prompt: text }
      : { model: this.config.model, input: text };

    const response: Response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Embedding request failed: ${response.status}`);
    }

    const data = (await response.json()) as Record<string, unknown>;
    const embeddingData = data as {
      embedding?: number[];
      data?: Array<{ embedding: number[] }>;
    };
    return isOllama
      ? (embeddingData.embedding ?? [])
      : (embeddingData.data?.[0]?.embedding ?? []);
  }

  async streamChat(
    messages: ChatMessage[],
    onChunk: (chunk: string) => void,
  ): Promise<string> {
    this.ensureInitialized();

    const { isOllama, response } = await this.getResponseByApi(messages);

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullContent = "";

    if (!reader) {
      throw new Error("No response body");
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n").filter((line) => line.trim() !== "");

      for (const line of lines) {
        try {
          if (isOllama) {
            const data = JSON.parse(line);
            const content = data.message?.content || "";
            fullContent += content;
            onChunk(content);
          } else {
            if (line.startsWith("data: ")) {
              const data = JSON.parse(line.slice(6));
              const content = data.choices?.[0]?.delta?.content || "";
              fullContent += content;
              onChunk(content);
            }
          }
        } catch {
          continue;
        }
      }
    }

    return fullContent;
  }

  async analyzeWithContext(context: string, task: string): Promise<string> {
    const prompt = `Context:\n${context}\n\nTask: ${task}\n\nProvide a detailed analysis based on the context above.`;
    return this.generate(prompt);
  }

  async extractEntities(text: string): Promise<{
    persons: string[];
    organizations: string[];
    locations: string[];
    dates: string[];
  }> {
    const prompt = `Extract named entities from the following text. Return ONLY a JSON object with keys: persons, organizations, locations, dates.\n\nText: ${text}`;
    const result = await this.generate(prompt);

    try {
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch {
      console.error("Failed to parse entities");
    }

    return { persons: [], organizations: [], locations: [], dates: [] };
  }

  async summarize(text: string): Promise<string> {
    return this.generate(`Summarize the following text concisely:\n\n${text}`);
  }

  async classify(
    text: string,
    categories: string[],
  ): Promise<{ category: string; confidence: number }> {
    const prompt = `Classify the following text into one of these categories: ${categories.join(", ")}.\n\nText: ${text}\n\nReturn ONLY a JSON object with keys: category, confidence (0-1).`;

    const result = await this.generate(prompt);

    try {
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch {
      console.error("Failed to parse classification");
    }

    return { category: categories[0] ?? "", confidence: 0 };
  }

  private async getResponseByApi(messages: ChatMessage[]) {
    const isOllama = this.config.provider === "ollama";

    const url = isOllama
      ? `${this.getBaseUrl()}/api/chat`
      : `${this.getBaseUrl()}/chat/completions`;

    const body: Record<string, unknown> = {
      model: this.config.model,
      messages,
      temperature: this.config.temperature ?? 0.7,
      stream: true,
    };

    if (!isOllama) {
      body.max_tokens = this.config.maxTokens ?? 2048;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`LLM stream failed: ${response.status}`);
    }

    return {isOllama, response};
  }

  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error("Skill not initialized. Call initialize() first.");
    }
  }
}

export function createOllamaLLM(
  model: string = "qwen2.5:14b",
  config?: Partial<LLMConfig>,
): LLMSkill {
  return new LLMSkill({
    provider: "ollama",
    model,
    enabled: true,
    ...config,
  });
}

export function createLMStudioLLM(
  model: string,
  baseUrl: string = "http://localhost:1234/v1",
  config?: Partial<LLMConfig>,
): LLMSkill {
  return new LLMSkill({
    provider: "lmstudio",
    model,
    baseUrl,
    enabled: true,
    ...config,
  });
}
