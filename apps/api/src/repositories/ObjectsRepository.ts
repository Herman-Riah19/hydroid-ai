import { Injectable, registerProvider } from "@tsed/di";
import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../datasources/AppDataSource.js";
import { Item } from "../entities/Object.js";

export const OBJECT_REPOSITORY = Symbol.for("ObjectRepository");

export const ObjectsRepositoryBase = AppDataSource.getRepository(Item);

registerProvider({
  provide: OBJECT_REPOSITORY,
  useValue: ObjectsRepositoryBase,
});

@Injectable()
export class ObjectsRepository {
  get repository() {
    return ObjectsRepositoryBase;
  }

  async findAll(): Promise<Item[]> {
    return this.repository.find();
  }

  async findOne(options: FindOneOptions<Item>): Promise<Item | null> {
    return this.repository.findOne(options);
  }

  async create(object: Partial<Item>): Promise<Item> {
    return this.repository.save(this.repository.create(object));
  }

  async update(id: string, object: Partial<Item>): Promise<Item> {
    await this.repository.update(id, object);
    return (await this.findOne({ where: { id } }))!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
