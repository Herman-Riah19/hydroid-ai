export interface ISkill {
  readonly name: string;
  readonly version: string;
  initialize(): Promise<void>;
  dispose(): Promise<void>;
}

export interface ISkillExecutor<TInput = unknown, TOutput = unknown> {
  execute(input: TInput): Promise<TOutput>;
}

export interface ISkillConfig {
  enabled: boolean;
  timeout?: number;
  retries?: number;
}