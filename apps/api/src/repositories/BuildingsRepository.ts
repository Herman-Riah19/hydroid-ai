import { Injectable, registerProvider } from "@tsed/di";
import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../datasources/AppDataSource.js";
import { Building } from "../entities/Building.js";

export const BUILDING_REPOSITORY = Symbol.for("BuildingRepository");

export const BuildingsRepositoryBase = AppDataSource.getRepository(Building);

registerProvider({
  provide: BUILDING_REPOSITORY,
  useValue: BuildingsRepositoryBase,
});

@Injectable()
export class BuildingsRepository {
  get repository() {
    return BuildingsRepositoryBase;
  }

  async findAll(): Promise<Building[]> {
    return this.repository.find();
  }

  async findOne(options: FindOneOptions<Building>): Promise<Building | null> {
    return this.repository.findOne(options);
  }

  async create(building: Partial<Building>): Promise<Building> {
    return this.repository.save(this.repository.create(building));
  }

  async update(id: string, building: Partial<Building>): Promise<Building> {
    await this.repository.update(id, building);
    return (await this.findOne({ where: { id } }))!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
