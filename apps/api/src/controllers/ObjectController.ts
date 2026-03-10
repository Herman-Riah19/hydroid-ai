import { Controller, Inject } from "@tsed/di";
import { BodyParams, QueryParams, PathParams } from "@tsed/platform-params";
import { Post, Title, Summary, Description, Returns, Get, Put, Delete, Status } from "@tsed/schema";
import { Docs } from "@tsed/swagger";
import { Item } from "src/entities";
import { ObjectService } from "src/services/ObjectService";

@Controller("/osint/objects")
@Docs("api-docs")
export class ObjectController {
  @Inject()
  private objectService!: ObjectService;

  @Post("/")
  @Title("Create Object")
  @Summary("Create a new object record")
  @Description("Add a new object to the database")
  @Returns(201, Item)
  async createObject(
    @BodyParams()
    body: {
      name?: string;
      category?: string;
      brand?: string;
      model?: string;
      description?: string;
      specifications?: string;
      images?: string;
      estimatedValue?: string;
      rarity?: string;
      origin?: string;
      sources?: string;
    },
  ): Promise<Item> {
    return this.objectService.createObject(body);
  }

  @Get("/")
  @Title("Get Objects")
  @Summary("List objects")
  @Description("Retrieve objects with optional filtering")
  @Returns(200, Array)
  async getAllObjects(
    @QueryParams("name") name?: string,
    @QueryParams("category") category?: string,
    @QueryParams("brand") brand?: string,
  ): Promise<Item[]> {
    if (name) return this.objectService.searchByName(name);
    if (category) return this.objectService.searchByCategory(category);
    if (brand) return this.objectService.searchByBrand(brand);
    return this.objectService.repository.find();
  }

  @Get("/:id")
  @Title("Get Object")
  @Summary("Get a single object")
  @Description("Retrieve detailed information about an object")
  @Returns(200, Object)
  async getObject(@PathParams("id") id: string): Promise<Item | null> {
    return this.objectService.findOne({
      where: { id },
    });
  }

  @Put("/:id")
  @Title("Update Object")
  @Summary("Update object information")
  @Description("Modify object details")
  @Returns(200, Object)
  async updateObject(
    @PathParams("id") id: string,
    @BodyParams() body: Partial<Item>,
  ): Promise<Item> {
    return this.objectService.updateObject(id, body);
  }

  @Delete("/:id")
  @Title("Delete Object")
  @Summary("Remove an object")
  @Description("Delete an object record")
  @Status(204)
  async deleteObject(@PathParams("id") id: string): Promise<void> {
    await this.objectService.delete(id);
  }
}
