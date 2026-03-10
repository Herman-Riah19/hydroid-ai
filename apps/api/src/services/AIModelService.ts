import { Injectable } from "@tsed/di";
import { AiModelsRepository } from "../repositories/AiModelsRepository.js";
import { AIModel } from "../entities/AIModel.js";
import { ModelType, ModelStatus } from "../entities/enums/index.js";

@Injectable()
export class AIModelService extends AiModelsRepository {
  async findByProvider(provider: string): Promise<AIModel[]> {
    return this.repository.find({ where: { provider } });
  }

  async findByType(modelType: ModelType): Promise<AIModel[]> {
    return this.repository.find({ where: { modelType } });
  }

  async findAvailable(): Promise<AIModel[]> {
    return this.repository.find({ where: { status: ModelStatus.AVAILABLE } });
  }

  async createModel(data: {
    name: string;
    provider: string;
    modelType: ModelType;
    baseModel?: string;
    description?: string;
    parameters?: string;
    contextLength?: number;
    pricing?: string;
  }): Promise<AIModel> {
    return this.create({
      name: data.name,
      provider: data.provider,
      modelType: data.modelType,
      baseModel: data.baseModel,
      description: data.description,
      parameters: data.parameters,
      contextLength: data.contextLength,
      pricing: data.pricing,
      status: ModelStatus.AVAILABLE,
    });
  }

  async updateStatus(modelId: string, status: ModelStatus): Promise<AIModel> {
    return this.update(modelId, { status });
  }
}
