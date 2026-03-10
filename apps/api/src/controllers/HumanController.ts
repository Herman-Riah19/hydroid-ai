import { Controller, Inject } from "@tsed/di";
import { BodyParams, QueryParams, PathParams } from "@tsed/platform-params";
import { Post, Title, Summary, Description, Returns, Get, Put, Delete, Status } from "@tsed/schema";
import { Docs } from "@tsed/swagger";
import { HumanProfile } from "src/entities";
import { HumanProfileService } from "src/services/HumanProfileService";

@Controller("/osint/humans")
@Docs("api-docs")
export class HumanController {
  @Inject()
  private humanService!: HumanProfileService;

  @Post("/")
  @Title("Create Human Profile")
  @Summary("Create a new human profile")
  @Description("Add a new human profile to the database")
  @Returns(201, HumanProfile)
  async createProfile(
    @BodyParams()
    body: {
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
    },
  ): Promise<HumanProfile> {
    return this.humanService.createProfile(body);
  }

  @Get("/")
  @Title("Get Human Profiles")
  @Summary("List human profiles")
  @Description("Retrieve human profiles with optional filtering")
  @Returns(200, Array)
  async getAllProfiles(
    @QueryParams("name") name?: string,
    @QueryParams("profession") profession?: string,
  ): Promise<HumanProfile[]> {
    if (name) return this.humanService.searchByName(name);
    if (profession) return this.humanService.searchByProfession(profession);
    return this.humanService.repository.find();
  }

  @Get("/:id")
  @Title("Get Human Profile")
  @Summary("Get a single human profile")
  @Description("Retrieve detailed information about a human profile")
  @Returns(200, Object)
  async getProfile(@PathParams("id") id: string): Promise<HumanProfile | null> {
    return this.humanService.findOne({
        where: { id },
    });
  }

  @Put("/:id")
  @Title("Update Human Profile")
  @Summary("Update human profile")
  @Description("Modify human profile information")
  @Returns(200, Object)
  async updateProfile(
    @PathParams("id") id: string,
    @BodyParams() body: Partial<HumanProfile>,
  ): Promise<HumanProfile> {
    return this.humanService.updateProfile(id, body);
  }

  @Delete("/:id")
  @Title("Delete Human Profile")
  @Summary("Remove a human profile")
  @Description("Delete a human profile")
  @Status(204)
  async deleteProfile(@PathParams("id") id: string): Promise<void> {
    await this.humanService.delete(id);
  }
}