import { Injectable } from "@tsed/di";
import { WeaponsRepository } from "../repositories/WeaponsRepository.js";
import { Weapon } from "../entities/Weapon.js";
import { WeaponCategory } from "../entities/enums/index.js";

@Injectable()
export class WeaponService extends WeaponsRepository {
  async findAll(): Promise<Weapon[]> {
    return this.repository.find({ order: { name: "ASC" } });
  }

  async findByCategory(category: WeaponCategory): Promise<Weapon[]> {
    return this.repository.find({
      where: { category },
      order: { name: "ASC" },
    });
  }

  async findByManufacturer(manufacturer: string): Promise<Weapon[]> {
    return this.repository
      .createQueryBuilder("weapon")
      .where("weapon.manufacturer LIKE :manufacturer", {
        manufacturer: `%${manufacturer}%`,
      })
      .orderBy("weapon.name", "ASC")
      .getMany();
  }

  async searchByName(name: string): Promise<Weapon[]> {
    return this.repository
      .createQueryBuilder("weapon")
      .where("weapon.name LIKE :name", { name: `%${name}%` })
      .getMany();
  }

  async findPremium(): Promise<Weapon[]> {
    return this.repository.find({
      where: { isPremium: true },
      order: { name: "ASC" },
    });
  }

  async createWeapon(data: {
    name: string;
    category: WeaponCategory;
    subcategory?: string;
    manufacturer?: string;
    country?: string;
    yearIntroduced?: string;
    description?: string;
    history?: string;
    use?: string;
    caliber?: string;
    weight?: string;
    length?: string;
    barrelLength?: string;
    muzzleVelocity?: string;
    effectiveRange?: string;
    capacity?: string;
    action?: string;
    images?: string;
    videos?: string;
    isAutomatic?: boolean;
    isPremium?: boolean;
    sources?: string;
  }): Promise<Weapon> {
    return this.create({
      ...data,
      isPremium: data.isPremium ?? true,
    });
  }

  async updateWeapon(weaponId: string, data: Partial<Weapon>): Promise<Weapon> {
    return this.update(weaponId, data);
  }
}
