import { Injectable } from "@tsed/di";
import { FineTuneJobsRepository } from "../repositories/FineTuneJobsRepository.js";
import { FineTuneJob } from "../entities/FineTuneJob.js";
import { FineTuneStatus } from "../entities/enums/index.js";

@Injectable()
export class FineTuneJobService extends FineTuneJobsRepository {
  async findByUser(userId: string): Promise<FineTuneJob[]> {
    return this.repository.find({
      where: { userId },
      relations: ["model", "loraConfigs"],
      order: { createdAt: "DESC" },
    });
  }

  async findByStatus(status: FineTuneStatus): Promise<FineTuneJob[]> {
    return this.repository.find({
      where: { status },
      relations: ["model"],
      order: { createdAt: "DESC" },
    });
  }

  async findByModel(modelId: string): Promise<FineTuneJob[]> {
    return this.repository.find({
      where: { modelId },
      order: { createdAt: "DESC" },
    });
  }

  async getWithDetails(jobId: string): Promise<FineTuneJob | null> {
    return this.repository.findOne({
      where: { id: jobId },
      relations: ["model", "loraConfigs"],
    });
  }

  async createJob(data: {
    userId: string;
    modelId: string;
    name: string;
    trainingData?: string;
    validationData?: string;
    hyperparameters?: string;
    baseModel: string;
    epochs?: number;
    batchSize?: number;
    learningRate?: number;
  }): Promise<FineTuneJob> {
    return this.create({
      userId: data.userId,
      modelId: data.modelId,
      name: data.name,
      trainingData: data.trainingData,
      validationData: data.validationData,
      hyperparameters: data.hyperparameters,
      baseModel: data.baseModel,
      epochs: data.epochs ?? 3,
      batchSize: data.batchSize,
      learningRate: data.learningRate,
      status: FineTuneStatus.PENDING,
    });
  }

  async startJob(jobId: string): Promise<FineTuneJob> {
    return this.update(jobId, {
      status: FineTuneStatus.TRAINING,
      startTime: new Date(),
    });
  }

  async completeJob(
    jobId: string,
    trainedModel: string,
    metrics?: string,
  ): Promise<FineTuneJob> {
    return this.update(jobId, {
      status: FineTuneStatus.COMPLETED,
      trainedModel,
      metrics,
      endTime: new Date(),
    });
  }

  async failJob(jobId: string, error: string): Promise<FineTuneJob> {
    return this.update(jobId, {
      status: FineTuneStatus.FAILED,
      loss: error,
      endTime: new Date(),
    });
  }

  async cancelJob(jobId: string): Promise<FineTuneJob> {
    return this.update(jobId, {
      status: FineTuneStatus.CANCELLED,
      endTime: new Date(),
    });
  }

  async updateMetrics(
    jobId: string,
    loss: string,
    metrics: string,
  ): Promise<FineTuneJob> {
    return this.update(jobId, { loss, metrics });
  }
}
