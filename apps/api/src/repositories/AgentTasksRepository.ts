import { Injectable, registerProvider } from "@tsed/di";
import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../datasources/AppDataSource.js";
import { AgentTask } from "../entities/AgentTask.js";

export const AGENT_TASK_REPOSITORY = Symbol.for("AgentTaskRepository");

export const AgentTasksRepositoryBase = AppDataSource.getRepository(AgentTask);

registerProvider({
  provide: AGENT_TASK_REPOSITORY,
  useValue: AgentTasksRepositoryBase,
});

@Injectable()
export class AgentTasksRepository {
  get repository() {
    return AgentTasksRepositoryBase;
  }

  async findAll(): Promise<AgentTask[]> {
    return this.repository.find();
  }

  async findOne(options: FindOneOptions<AgentTask>): Promise<AgentTask | null> {
    return this.repository.findOne(options);
  }

  async findByAgent(agentId: string): Promise<AgentTask[]> {
    return this.repository.find({ where: { agentId } });
  }

  async create(task: Partial<AgentTask>): Promise<AgentTask> {
    return this.repository.save(this.repository.create(task));
  }

  async update(id: string, task: Partial<AgentTask>): Promise<AgentTask> {
    await this.repository.update(id, task);
    return (await this.findOne({ where: { id } }))!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
