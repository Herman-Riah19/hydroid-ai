import { Injectable } from "@tsed/di";
import { AiAgentsRepository } from "../repositories/AiAgentsRepository.js";
import { AIAgent } from "../entities/AIAgent.js";
import { AgentType, AgentStatus } from "../entities/enums/index.js";

@Injectable()
export class AIAgentService extends AiAgentsRepository {
  async findByUser(userId: string): Promise<AIAgent[]> {
    return this.repository.find({ where: { userId } });
  }

  async findByStatus(userId: string, status: AgentStatus): Promise<AIAgent[]> {
    return this.repository.find({ where: { userId, status } });
  }

  async findByType(userId: string, agentType: AgentType): Promise<AIAgent[]> {
    return this.repository.find({ where: { userId, agentType } });
  }

  async getWithExecutions(agentId: string): Promise<AIAgent | null> {
    return this.repository.findOne({
      where: { id: agentId },
      relations: ["tasks", "executions"],
    });
  }

  async createAgent(data: {
    userId: string;
    name: string;
    description?: string;
    agentType: AgentType;
    capabilities?: string;
    modelProvider?: string;
    modelName?: string;
  }): Promise<AIAgent> {
    return this.create({
      userId: data.userId,
      name: data.name,
      description: data.description,
      agentType: data.agentType,
      capabilities: data.capabilities,
      modelProvider: data.modelProvider,
      modelName: data.modelName,
    });
  }

  async activate(agentId: string): Promise<AIAgent> {
    return this.update(agentId, { status: AgentStatus.ACTIVE });
  }

  async deactivate(agentId: string): Promise<AIAgent> {
    return this.update(agentId, { status: AgentStatus.INACTIVE });
  }
}
