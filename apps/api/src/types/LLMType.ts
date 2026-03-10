import { ISkill, ISkillConfig } from "./SkillbaseType.js";

export interface LLMConfig extends ISkillConfig {
  provider: "ollama" | "lmstudio";
  baseUrl?: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface ChatCompletionResponse {
  id: string;
  model: string;
  choices: {
    index: number;
    message: ChatMessage;
    finishReason: string;
  }[];
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface EmbeddingRequest {
  model: string;
  input: string | string[];
}

export interface EmbeddingResponse {
  model: string;
  data: {
    embedding: number[];
    index: number;
  }[];
  usage: {
    promptTokens: number;
    totalTokens: number;
  };
}

export interface ILLMSkill extends ISkill {
  chat(messages: ChatMessage[]): Promise<string>;
  generate(prompt: string): Promise<string>;
  embed(text: string): Promise<number[]>;
  streamChat(
    messages: ChatMessage[],
    onChunk: (chunk: string) => void,
  ): Promise<string>;
  analyzeWithContext(context: string, task: string): Promise<string>;
  extractEntities(text: string): Promise<{
    persons: string[];
    organizations: string[];
    locations: string[];
    dates: string[];
  }>;
  summarize(text: string): Promise<string>;
  classify(
    text: string,
    categories: string[],
  ): Promise<{
    category: string;
    confidence: number;
  }>;
}