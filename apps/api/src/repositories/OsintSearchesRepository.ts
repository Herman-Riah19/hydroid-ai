import { Injectable, registerProvider } from "@tsed/di";
import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../datasources/AppDataSource.js";
import { OsintSearch } from "../entities/OsintSearch.js";
import { SearchStatus, OsintType } from "../entities/enums/index.js";

export const OSINT_SEARCH_REPOSITORY = Symbol.for("OsintSearchRepository");

export const OsintSearchRepository = AppDataSource.getRepository(
  OsintSearch,
).extend({
  findByUser(userId: string) {
    return this.find({ where: { userId }, order: { createdAt: "DESC" } });
  },
  findByType(userId: string, searchType: OsintType) {
    return this.find({
      where: { userId, searchType },
      order: { createdAt: "DESC" },
    });
  },
  findPending(userId: string) {
    return this.find({
      where: { userId, status: SearchStatus.PENDING },
      order: { createdAt: "ASC" },
    });
  },
});

registerProvider({
  provide: OSINT_SEARCH_REPOSITORY,
  useValue: OsintSearchRepository,
});

@Injectable()
export class OsintSearchesRepository {
  get repository() {
    return OsintSearchRepository;
  }

  async findAll(): Promise<OsintSearch[]> {
    return this.repository.find();
  }

  async findOne(
    options: FindOneOptions<OsintSearch>,
  ): Promise<OsintSearch | null> {
    return this.repository.findOne(options);
  }

  async findByUser(userId: string): Promise<OsintSearch[]> {
    return OsintSearchRepository.findByUser(userId);
  }

  async create(search: Partial<OsintSearch>): Promise<OsintSearch> {
    return this.repository.save(this.repository.create(search));
  }

  async update(id: string, search: Partial<OsintSearch>): Promise<OsintSearch> {
    await this.repository.update(id, search);
    return (await this.findOne({ where: { id } }))!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
