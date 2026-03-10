import { Injectable } from "@tsed/di";
import { LoRaConfigsRepository } from "../repositories/LoRaConfigsRepository.js";
import { LoRAConfig } from "../entities/LoRAConfig.js";

@Injectable()
export class LoRAConfigService extends LoRaConfigsRepository {
  async findByModel(modelId: string): Promise<LoRAConfig[]> {
    return this.repository.find({ where: { modelId } });
  }

  async createLoRAConfig(data: {
    name: string;
    description?: string;
    rank?: number;
    alpha?: number;
    dropout?: number;
    targetModules?: string;
    modelId?: string;
  }): Promise<LoRAConfig> {
    return this.create({
      name: data.name,
      description: data.description,
      rank: data.rank ?? 8,
      alpha: data.alpha ?? 16,
      dropout: data.dropout ?? 0.05,
      targetModules: data.targetModules,
      modelId: data.modelId,
    });
  }

  async updateLoRAConfig(
    configId: string,
    data: Partial<LoRAConfig>,
  ): Promise<LoRAConfig> {
    return this.update(configId, data);
  }
}
