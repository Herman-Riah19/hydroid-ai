import { Injectable, registerProvider } from "@tsed/di";
import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../datasources/AppDataSource.js";
import { AIAgent } from "../entities/AIAgent.js";

export const AI_AGENT_REPOSITORY = Symbol.for("AIAgentRepository");

export const AiAgentsRepositoryBase = AppDataSource.getRepository(AIAgent);

registerProvider({
  provide: AI_AGENT_REPOSITORY,
  useValue: AiAgentsRepositoryBase,
});

@Injectable()
export class AiAgentsRepository {
  get repository() {
    return AiAgentsRepositoryBase;
  }

  async findAll(): Promise<AIAgent[]> {
    return this.repository.find();
  }

  async findOne(options: FindOneOptions<AIAgent>): Promise<AIAgent | null> {
    return this.repository.findOne(options);
  }

  async findByUser(userId: string): Promise<AIAgent[]> {
    return this.repository.find({ where: { userId } });
  }

  async create(agent: Partial<AIAgent>): Promise<AIAgent> {
    return this.repository.save(this.repository.create(agent));
  }

  async update(id: string, agent: Partial<AIAgent>): Promise<AIAgent> {
    await this.repository.update(id, agent);
    return (await this.findOne({ where: { id } }))!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
