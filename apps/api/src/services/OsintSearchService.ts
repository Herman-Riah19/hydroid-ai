import { Injectable } from "@tsed/di";
import { OsintSearchesRepository } from "../repositories/OsintSearchesRepository.js";
import { OsintSearch } from "../entities/OsintSearch.js";
import { SearchStatus, OsintType } from "../entities/enums/index.js";

@Injectable()
export class OsintSearchService extends OsintSearchesRepository {
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
    results: string,
    confidence?: number,
  ): Promise<OsintSearch> {
    return this.update(searchId, {
      status: SearchStatus.COMPLETED,
      results,
      confidence,
    });
  }

  async failSearch(searchId: string, error: string): Promise<OsintSearch> {
    return this.update(searchId, {
      status: SearchStatus.FAILED,
      results: error,
    });
  }

  async updateStatus(
    searchId: string,
    status: SearchStatus,
  ): Promise<OsintSearch> {
    return this.update(searchId, { status });
  }
}
