import { Property, Required, Description, Allow } from "@tsed/schema";

export class OrganizationModelDto {
  @Property(String)
  @Required()
  @Description("The name oforganization is Required")
  name!: string;

  @Property(String)
  @Allow(null)
  @Description("URL or key of the organization logo")
  logo!: string | null;

  @Property(String)
  @Allow(null)
  description!: string | null;

  @Property(String)
  @Required()
  @Description("The slug oforganization is Required")
  slug!: string;
}

