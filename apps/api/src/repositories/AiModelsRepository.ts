import { Injectable, registerProvider } from "@tsed/di";
import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../datasources/AppDataSource.js";
import { AIModel } from "../entities/AIModel.js";

export const AI_MODEL_REPOSITORY = Symbol.for("AIModelRepository");

export const AiModelsRepositoryBase = AppDataSource.getRepository(AIModel);

registerProvider({
  provide: AI_MODEL_REPOSITORY,
  useValue: AiModelsRepositoryBase,
});

@Injectable()
export class AiModelsRepository {
  get repository() {
    return AiModelsRepositoryBase;
  }

  async findAll(): Promise<AIModel[]> {
    return this.repository.find();
  }

  async findOne(options: FindOneOptions<AIModel>): Promise<AIModel | null> {
    return this.repository.findOne(options);
  }

  async create(model: Partial<AIModel>): Promise<AIModel> {
    return this.repository.save(this.repository.create(model));
  }

  async update(id: string, model: Partial<AIModel>): Promise<AIModel> {
    await this.repository.update(id, model);
    return (await this.findOne({ where: { id } }))!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
