import { Injectable, registerProvider } from "@tsed/di";
import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../datasources/AppDataSource.js";
import { Weapon } from "../entities/Weapon.js";
import { WeaponCategory } from "../entities/enums/index.js";

export const WEAPON_REPOSITORY = Symbol.for("WeaponRepository");

export const WeaponRepository = AppDataSource.getRepository(Weapon).extend({
  findByCategory(category: WeaponCategory) {
    return this.find({ where: { category }, order: { name: "ASC" } });
  },
  findByManufacturer(manufacturer: string) {
    return this.createQueryBuilder("weapon")
      .where("weapon.manufacturer LIKE :manufacturer", {
        manufacturer: `%${manufacturer}%`,
      })
      .orderBy("weapon.name", "ASC")
      .getMany();
  },
  searchByName(name: string) {
    return this.createQueryBuilder("weapon")
      .where("weapon.name LIKE :name", { name: `%${name}%` })
      .getMany();
  },
  findPremium() {
    return this.find({ where: { isPremium: true }, order: { name: "ASC" } });
  },
});

registerProvider({
  provide: WEAPON_REPOSITORY,
  useValue: WeaponRepository,
});

@Injectable()
export class WeaponsRepository {
  get repository() {
    return WeaponRepository;
  }

  async findAll(): Promise<Weapon[]> {
    return this.repository.find({ order: { name: "ASC" } });
  }

  async findOne(options: FindOneOptions<Weapon>): Promise<Weapon | null> {
    return this.repository.findOne(options);
  }

  async findByCategory(category: WeaponCategory): Promise<Weapon[]> {
    return WeaponRepository.findByCategory(category);
  }

  async findByManufacturer(manufacturer: string): Promise<Weapon[]> {
    return WeaponRepository.findByManufacturer(manufacturer);
  }

  async searchByName(name: string): Promise<Weapon[]> {
    return WeaponRepository.searchByName(name);
  }

  async findPremium(): Promise<Weapon[]> {
    return WeaponRepository.findPremium();
  }

  async create(weapon: Partial<Weapon>): Promise<Weapon> {
    return this.repository.save(this.repository.create(weapon));
  }

  async update(id: string, weapon: Partial<Weapon>): Promise<Weapon> {
    await this.repository.update(id, weapon);
    return (await this.findOne({ where: { id } }))!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
