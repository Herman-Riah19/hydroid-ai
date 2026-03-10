import { Injectable } from "@tsed/di";
import { AgentExecutionsRepository } from "../repositories/AgentExecutionsRepository.js";
import { AgentExecution } from "../entities/AgentExecution.js";
import { ExecutionStatus } from "../entities/enums/index.js";

@Injectable()
export class AgentExecutionService extends AgentExecutionsRepository {
  async findByAgent(
    agentId: string,
    status?: ExecutionStatus,
  ): Promise<AgentExecution[]> {
    const where: any = { agentId };
    if (status) where.status = status;

    return this.repository.find({
      where,
      relations: ["task"],
      order: { createdAt: "DESC" },
      take: 100,
    });
  }

  async findByTask(taskId: string): Promise<AgentExecution[]> {
    return this.repository.find({
      where: { taskId },
      order: { createdAt: "DESC" },
    });
  }

  async createExecution(data: {
    agentId: string;
    taskId: string;
    input?: string;
  }): Promise<AgentExecution> {
    return this.create({
      agentId: data.agentId,
      taskId: data.taskId,
      input: data.input,
      status: ExecutionStatus.PENDING,
      startedAt: new Date(),
    });
  }

  async startExecution(executionId: string): Promise<AgentExecution> {
    return this.update(executionId, { status: ExecutionStatus.RUNNING });
  }

  async completeExecution(
    executionId: string,
    output: string,
  ): Promise<AgentExecution> {
    return this.update(executionId, {
      status: ExecutionStatus.COMPLETED,
      output,
      completedAt: new Date(),
    });
  }

  async failExecution(
    executionId: string,
    error: string,
  ): Promise<AgentExecution> {
    return this.update(executionId, {
      status: ExecutionStatus.FAILED,
      error,
      completedAt: new Date(),
    });
  }

  async cancelExecution(executionId: string): Promise<AgentExecution> {
    return this.update(executionId, {
      status: ExecutionStatus.CANCELLED,
      completedAt: new Date(),
    });
  }
}
