import { Controller, Inject } from "@tsed/di";
import { BodyParams, QueryParams, PathParams } from "@tsed/platform-params";
import { Post, Title, Summary, Description, Returns, Get, Put, Delete, Status } from "@tsed/schema";
import { Docs } from "@tsed/swagger";
import { Building } from "src/entities";
import { BuildingService } from "src/services/BuildingService";

@Controller("/osint/buildings")
@Docs("api-docs")
export class BuildingController {
  @Inject()
  private buildingService!: BuildingService;

  @Post("/")
  @Title("Create Building")
  @Summary("Create a new building record")
  @Description("Add a new building to the database")
  @Returns(201, Building)
  async createBuilding(
    @BodyParams()
    body: {
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
    },
  ): Promise<Building> {
    return this.buildingService.createBuilding(body);
  }

  @Get("/")
  @Title("Get Buildings")
  @Summary("List buildings")
  @Description("Retrieve buildings with optional filtering")
  @Returns(200, Array)
  async getAllBuildings(
    @QueryParams("name") name?: string,
    @QueryParams("city") city?: string,
    @QueryParams("type") buildingType?: string,
  ): Promise<Building[]> {
    if (name) return this.buildingService.searchByName(name);
    if (city) return this.buildingService.searchByCity(city);
    if (buildingType) return this.buildingService.searchByType(buildingType);
    return this.buildingService.repository.find();
  }

  @Get("/:id")
  @Title("Get Building")
  @Summary("Get a single building")
  @Description("Retrieve detailed information about a building")
  @Returns(200, Object)
  async getBuilding(@PathParams("id") id: string): Promise<Building | null> {
    return this.buildingService.findOne({
        where: { id },
    });
  }

  @Put("/:id")
  @Title("Update Building")
  @Summary("Update building information")
  @Description("Modify building details")
  @Returns(200, Object)
  async updateBuilding(
    @PathParams("id") id: string,
    @BodyParams() body: Partial<Building>,
  ): Promise<Building> {
    return this.buildingService.updateBuilding(id, body);
  }

  @Delete("/:id")
  @Title("Delete Building")
  @Summary("Remove a building")
  @Description("Delete a building record")
  @Status(204)
  async deleteBuilding(@PathParams("id") id: string): Promise<void> {
    await this.buildingService.delete(id);
  }
}