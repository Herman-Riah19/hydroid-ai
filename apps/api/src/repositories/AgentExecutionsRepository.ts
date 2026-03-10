import { Injectable, registerProvider } from "@tsed/di";
import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../datasources/AppDataSource.js";
import { AgentExecution } from "../entities/AgentExecution.js";

export const AGENT_EXECUTION_REPOSITORY = Symbol.for(
  "AgentExecutionRepository",
);

export const AgentExecutionsRepositoryBase =
  AppDataSource.getRepository(AgentExecution);

registerProvider({
  provide: AGENT_EXECUTION_REPOSITORY,
  useValue: AgentExecutionsRepositoryBase,
});

@Injectable()
export class AgentExecutionsRepository {
  get repository() {
    return AgentExecutionsRepositoryBase;
  }

  async findAll(): Promise<AgentExecution[]> {
    return this.repository.find();
  }

  async findOne(
    options: FindOneOptions<AgentExecution>,
  ): Promise<AgentExecution | null> {
    return this.repository.findOne(options);
  }

  async findByTask(taskId: string): Promise<AgentExecution[]> {
    return this.repository.find({ where: { taskId } });
  }

  async create(execution: Partial<AgentExecution>): Promise<AgentExecution> {
    return this.repository.save(this.repository.create(execution));
  }

  async update(
    id: string,
    execution: Partial<AgentExecution>,
  ): Promise<AgentExecution> {
    await this.repository.update(id, execution);
    return (await this.findOne({ where: { id } }))!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
