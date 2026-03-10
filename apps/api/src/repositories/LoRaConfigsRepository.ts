import { Injectable, registerProvider } from "@tsed/di";
import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../datasources/AppDataSource.js";
import { LoRAConfig } from "../entities/LoRAConfig.js";

export const LORA_CONFIG_REPOSITORY = Symbol.for("LoRAConfigRepository");

export const LoRaConfigsRepositoryBase =
  AppDataSource.getRepository(LoRAConfig);

registerProvider({
  provide: LORA_CONFIG_REPOSITORY,
  useValue: LoRaConfigsRepositoryBase,
});

@Injectable()
export class LoRaConfigsRepository {
  get repository() {
    return LoRaConfigsRepositoryBase;
  }

  async findAll(): Promise<LoRAConfig[]> {
    return this.repository.find();
  }

  async findOne(
    options: FindOneOptions<LoRAConfig>,
  ): Promise<LoRAConfig | null> {
    return this.repository.findOne(options);
  }

  async findByModel(modelId: string): Promise<LoRAConfig[]> {
    return this.repository.find({ where: { modelId } });
  }

  async create(config: Partial<LoRAConfig>): Promise<LoRAConfig> {
    return this.repository.save(this.repository.create(config));
  }

  async update(id: string, config: Partial<LoRAConfig>): Promise<LoRAConfig> {
    await this.repository.update(id, config);
    return (await this.findOne({ where: { id } }))!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
