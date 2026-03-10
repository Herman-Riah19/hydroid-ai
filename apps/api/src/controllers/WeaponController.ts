import { Controller, Inject } from "@tsed/di";
import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";
import {
  Get,
  Post,
  Put,
  Delete,
  Returns,
  Summary,
  Title,
  Description,
  Status,
} from "@tsed/schema";
import { WeaponService } from "src/services/WeaponService";
import { Weapon } from "../entities/Weapon.js";
import { CreateWeaponDto, UpdateWeaponDto } from "src/validators/WeaponDto";
import { Docs } from "@tsed/swagger";

@Controller("/premium/weapons")
@Docs("api-docs")
export class WeaponController {
  @Inject()
  private weaponService: WeaponService;

  @Post("/")
  @Title("Create Weapon")
  @Summary("Create a new weapon record")
  @Description("Add a new weapon to the premium database")
  @Returns(201, Weapon)
  async createWeapon(@BodyParams() body: CreateWeaponDto): Promise<Weapon> {
    return this.weaponService.createWeapon(body as any);
  }

  @Get("/")
  @Title("Get Weapons")
  @Summary("List weapons")
  @Description("Retrieve weapons with optional filtering")
  @Returns(200, Array)
  async getAllWeapons(
    @QueryParams("category") category?: string,
    @QueryParams("manufacturer") manufacturer?: string,
    @QueryParams("name") name?: string,
    @QueryParams("premium") premium?: boolean,
  ): Promise<Weapon[]> {
    if (category) return this.weaponService.findByCategory(category as any);
    if (manufacturer)
      return this.weaponService.findByManufacturer(manufacturer);
    if (name) return this.weaponService.searchByName(name);
    if (premium) return this.weaponService.findPremium();
    return this.weaponService.findAll();
  }

  @Get("/:id")
  @Title("Get Weapon")
  @Summary("Get a single weapon")
  @Description("Retrieve detailed information about a weapon")
  @Returns(200, Object)
  async getWeapon(@PathParams("id") id: string): Promise<Weapon | null> {
    return this.weaponService.findOne(id);
  }

  @Put("/:id")
  @Title("Update Weapon")
  @Summary("Update weapon information")
  @Description("Modify weapon details")
  @Returns(200, Object)
  async updateWeapon(
    @PathParams("id") id: string,
    @BodyParams() body: UpdateWeaponDto,
  ): Promise<Weapon> {
    return this.weaponService.updateWeapon(id, body as any);
  }

  @Delete("/:id")
  @Title("Delete Weapon")
  @Summary("Remove a weapon")
  @Description("Delete a weapon record")
  @Status(204)
  async deleteWeapon(@PathParams("id") id: string): Promise<void> {
    await this.weaponService.delete(id);
  }
}
