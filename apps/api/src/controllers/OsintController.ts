import { Controller, Inject } from "@tsed/di";
import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";
import {
  Get,
  Post,
  Returns,
  Summary,
  Title,
  Description,
} from "@tsed/schema";
import { OsintSearchService } from "src/services/OsintSearchService";
import { OsintSearch } from "../entities/OsintSearch.js";
import { Docs } from "@tsed/swagger";
import { OsintExecutorService } from "src/services/OsintExecutorService.js";

@Controller("/osint")
@Docs("api-docs")
export class OsintController {
  @Inject()
  private osintService!: OsintSearchService;

  @Inject()
  private osintExecutorService!: OsintExecutorService;

  @Post("/search")
  @Title("Create OSINT Search")
  @Summary("Create a new OSINT search")
  @Description("Initiate a new OSINT search query")
  @Returns(201, OsintSearch)
  async createSearch(
    @BodyParams()
    body: {
      userId: string;
      searchType: string;
      query: string;
      source?: string;
    },
  ): Promise<any> {
    const osintSearch = await this.osintService.createSearch(body as any);
    const resultat = await this.osintExecutorService.executeSearch(osintSearch.id);
    return resultat;
  }

  @Get("/searches")
  @Title("Get OSINT Searches")
  @Summary("List all OSINT searches")
  @Description("Retrieve all OSINT searches with optional filtering")
  @Returns(200, Array)
  async getAllSearches(
    @QueryParams("userId") userId?: string,
    @QueryParams("type") searchType?: string,
  ): Promise<OsintSearch[]> {
    if (userId && searchType) {
      return this.osintService.findByType(userId, searchType as any);
    }
    if (userId) return this.osintService.findByUser(userId);
    return this.osintService.repository.find();
  }

  @Get("/searches/:id")
  @Title("Get Search")
  @Summary("Get a single search")
  @Description("Retrieve details of a specific search")
  @Returns(200, Object)
  async getSearch(@PathParams("id") id: string): Promise<OsintSearch | null> {
    return this.osintService.findOne({
      where: { id },
    });
  }

  @Post("/searches/:id/complete")
  @Title("Complete Search")
  @Summary("Mark search as completed")
  @Description("Update search status with results")
  @Returns(200, Object)
  async completeSearch(
    @PathParams("id") id: string,
    @BodyParams() body: { results: string; confidence?: number },
  ): Promise<OsintSearch> {
    return this.osintService.completeSearch(id, body.results, body.confidence);
  }

  @Post("/searches/:id/fail")
  @Title("Fail Search")
  @Summary("Mark search as failed")
  @Description("Update search status with error")
  @Returns(200, Object)
  async failSearch(
    @PathParams("id") id: string,
    @BodyParams() body: { error: string },
  ): Promise<OsintSearch> {
    return this.osintService.failSearch(id, body.error);
  }
}