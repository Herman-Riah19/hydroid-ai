import { Injectable } from "@tsed/di";
import { BuildingsRepository } from "../repositories/BuildingsRepository.js";
import { Building } from "../entities/Building.js";

@Injectable()
export class BuildingService extends BuildingsRepository {
  async searchByName(name: string): Promise<Building[]> {
    return this.repository
      .createQueryBuilder("building")
      .where("building.name LIKE :name", { name: `%${name}%` })
      .getMany();
  }

  async searchByCity(city: string): Promise<Building[]> {
    return this.repository
      .createQueryBuilder("building")
      .where("building.city LIKE :city", { city: `%${city}%` })
      .getMany();
  }

  async searchByAddress(address: string): Promise<Building[]> {
    return this.repository
      .createQueryBuilder("building")
      .where("building.address LIKE :address", { address: `%${address}%` })
      .getMany();
  }

  async searchByType(buildingType: string): Promise<Building[]> {
    return this.repository
      .createQueryBuilder("building")
      .where("building.buildingType LIKE :buildingType", {
        buildingType: `%${buildingType}%`,
      })
      .getMany();
  }

  async createBuilding(data: {
    name?: string;
    address?: string;
    city?: string;
    country?: string;
    buildingType?: string;
    constructionYear?: string;
    architect?: string;
    coordinates?: string;
    owner?: string;
    usage?: string;
    images?: string;
    description?: string;
    sources?: string;
  }): Promise<Building> {
    return this.create(data);
  }

  async updateBuilding(
    buildingId: string,
    data: Partial<Building>,
  ): Promise<Building> {
    return this.update(buildingId, data);
  }
}
