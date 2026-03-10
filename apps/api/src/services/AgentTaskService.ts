import { Injectable } from "@tsed/di";
import { AgentTasksRepository } from "../repositories/AgentTasksRepository.js";
import { AgentTask } from "../entities/AgentTask.js";

@Injectable()
export class AgentTaskService extends AgentTasksRepository {
  async findByAgent(agentId: string): Promise<AgentTask[]> {
    return this.repository.find({ where: { agentId } });
  }

  async createTask(data: {
    agentId: string;
    name: string;
    description?: string;
    inputSchema?: string;
    outputSchema?: string;
  }): Promise<AgentTask> {
    return this.create({
      agentId: data.agentId,
      name: data.name,
      description: data.description,
      inputSchema: data.inputSchema,
      outputSchema: data.outputSchema,
    });
  }

  async updateTask(
    taskId: string,
    data: Partial<AgentTask>,
  ): Promise<AgentTask> {
    return this.update(taskId, data);
  }
}
