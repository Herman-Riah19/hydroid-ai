import { Injectable } from "@tsed/di";
import { ObjectsRepository } from "../repositories/ObjectsRepository.js";
import { Item } from "../entities/Object.js";

@Injectable()
export class ObjectService extends ObjectsRepository {
  async searchByName(name: string): Promise<Item[]> {
    return this.repository
      .createQueryBuilder("object")
      .where("object.name LIKE :name", { name: `%${name}%` })
      .getMany();
  }

  async searchByCategory(category: string): Promise<Item[]> {
    return this.repository
      .createQueryBuilder("object")
      .where("object.category LIKE :category", { category: `%${category}%` })
      .getMany();
  }

  async searchByBrand(brand: string): Promise<Item[]> {
    return this.repository
      .createQueryBuilder("object")
      .where("object.brand LIKE :brand", { brand: `%${brand}%` })
      .getMany();
  }

  async createObject(data: {
    name?: string;
    category?: string;
    brand?: string;
    model?: string;
    description?: string;
    specifications?: string;
    images?: string;
    estimatedValue?: string;
    rarity?: string;
    origin?: string;
    sources?: string;
  }): Promise<Item> {
    return this.create(data);
  }

  async updateObject(objectId: string, data: Partial<Item>): Promise<Item> {
    return this.update(objectId, data);
  }
}
