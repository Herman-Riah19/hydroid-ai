import { Injectable, Inject, logger } from "@tsed/di";
import { SkillFactory } from "../factories/SkillFactory.js";
import { OsintSearchesRepository } from "../repositories/OsintSearchesRepository.js";
import { SearchStatus, OsintType } from "../entities/enums/index.js";
import { Logger } from "@tsed/logger";
import { OsintSearch } from "src/entities/OsintSearch.js";

const OSINT_TYPE_MAP: Record<
  string,
  "person" | "email" | "phone" | "domain" | "image" | "location"
> = {
  [OsintType.PERSON]: "person",
  [OsintType.BUILDING]: "domain",
  [OsintType.OBJECT]: "image",
  [OsintType.LOCATION]: "location",
};

@Injectable()
export class OsintExecutorService extends OsintSearchesRepository {
  constructor(@Inject() private skillFactory: SkillFactory, private logger: Logger) {
    super();
  }

  async executeSearch(searchId: string): Promise<any> {
    const search = await this.repository.findOne({ where: { id: searchId } });
    if (!search) {
      throw new Error("Search not found");
    }

    await this.updateStatus(searchId, SearchStatus.PROCESSING);

    try {
      const osintType = OSINT_TYPE_MAP[search.searchType] ?? "person";

      const result = await this.skillFactory.osint.search({
        target: search.query,
        type: osintType,
      });
      return this.completeSearch(
        searchId,
        result,
        result.confidence,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return this.failSearch(searchId);
    }
  }

  async findByUser(userId: string): Promise<OsintSearch[]> {
    return this.repository.find({
      where: { userId },
      order: { createdAt: "DESC" },
    });
  }

  async findByType(
    userId: string,
    searchType: OsintType,
  ): Promise<OsintSearch[]> {
    return this.repository.find({
      where: { userId, searchType },
      order: { createdAt: "DESC" },
    });
  }

  async findPending(userId: string): Promise<OsintSearch[]> {
    return this.repository.find({
      where: { userId, status: SearchStatus.PENDING },
      order: { createdAt: "ASC" },
    });
  }

  async createSearch(data: {
    userId: string;
    searchType: OsintType;
    query: string;
    source?: string;
  }): Promise<OsintSearch> {
    return this.create({
      userId: data.userId,
      searchType: data.searchType,
      query: data.query,
      source: data.source,
      status: SearchStatus.PENDING,
    });
  }

  async completeSearch(
    searchId: string,
    result: Record<string, any>,
    confidence?: number,
  ): Promise<OsintSearch> {

    return this.update(searchId, {
      status: SearchStatus.COMPLETED,
      result,
      confidence,
    });
  }

  async failSearch(searchId: string): Promise<OsintSearch> {
    return this.update(searchId, {
      status: SearchStatus.FAILED,
    });
  }

  async updateStatus(
    searchId: string,
    status: SearchStatus,
  ): Promise<OsintSearch> {
    return this.update(searchId, { status });
  }
}
