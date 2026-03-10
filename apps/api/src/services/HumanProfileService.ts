import { Injectable } from "@tsed/di";
import { HumanProfilesRepository } from "../repositories/HumanProfilesRepository.js";
import { HumanProfile } from "../entities/HumanProfile.js";

@Injectable()
export class HumanProfileService extends HumanProfilesRepository {
  async searchByName(name: string): Promise<HumanProfile[]> {
    return this.repository
      .createQueryBuilder("profile")
      .where("profile.name LIKE :name", { name: `%${name}%` })
      .orWhere("profile.aliases LIKE :aliases", { aliases: `%${name}%` })
      .getMany();
  }

  async searchByProfession(profession: string): Promise<HumanProfile[]> {
    return this.repository
      .createQueryBuilder("profile")
      .where("profile.profession LIKE :profession", {
        profession: `%${profession}%`,
      })
      .getMany();
  }

  async createProfile(data: {
    name?: string;
    aliases?: string;
    dateOfBirth?: string;
    placeOfBirth?: string;
    profession?: string;
    socialMedia?: string;
    images?: string;
    knownAssociates?: string;
    locations?: string;
    description?: string;
    sources?: string;
    riskScore?: number;
  }): Promise<HumanProfile> {
    return this.create(data);
  }

  async updateProfile(
    profileId: string,
    data: Partial<HumanProfile>,
  ): Promise<HumanProfile> {
    return this.update(profileId, data);
  }
}
