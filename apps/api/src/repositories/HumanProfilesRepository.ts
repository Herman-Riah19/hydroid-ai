import { Injectable, registerProvider } from "@tsed/di";
import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../datasources/AppDataSource.js";
import { HumanProfile } from "../entities/HumanProfile.js";

export const HUMAN_PROFILE_REPOSITORY = Symbol.for("HumanProfileRepository");

export const HumanProfilesRepositoryBase =
  AppDataSource.getRepository(HumanProfile);

registerProvider({
  provide: HUMAN_PROFILE_REPOSITORY,
  useValue: HumanProfilesRepositoryBase,
});

@Injectable()
export class HumanProfilesRepository {
  get repository() {
    return HumanProfilesRepositoryBase;
  }

  async findAll(): Promise<HumanProfile[]> {
    return this.repository.find();
  }

  async findOne(
    options: FindOneOptions<HumanProfile>,
  ): Promise<HumanProfile | null> {
    return this.repository.findOne(options);
  }

  async create(profile: Partial<HumanProfile>): Promise<HumanProfile> {
    return this.repository.save(this.repository.create(profile));
  }

  async update(
    id: string,
    profile: Partial<HumanProfile>,
  ): Promise<HumanProfile> {
    await this.repository.update(id, profile);
    return (await this.findOne({ where: { id } }))!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
