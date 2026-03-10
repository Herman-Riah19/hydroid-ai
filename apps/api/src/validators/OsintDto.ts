import { Required, MaxLength, Min, Max } from "@tsed/schema";

export class CreateOsintSearchDto {
  @Required()
  userId!: string;

  @Required()
  searchType!: string;

  @Required()
  @MaxLength(500)
  query!: string;

  @MaxLength(100)
  source?: string;
}

export class CompleteOsintSearchDto {
  @Required()
  @MaxLength(50000)
  results!: string;

  @Min(0)
  @Max(100)
  confidence?: number;
}

export class FailOsintSearchDto {
  @Required()
  @MaxLength(2000)
  error!: string;
}

export class CreateHumanProfileDto {
  @MaxLength(200)
  name?: string;

  @MaxLength(500)
  aliases?: string;

  @MaxLength(20)
  dateOfBirth?: string;

  @MaxLength(200)
  placeOfBirth?: string;

  @MaxLength(200)
  profession?: string;

  @MaxLength(1000)
  socialMedia?: string;

  @MaxLength(2000)
  images?: string;

  @MaxLength(2000)
  knownAssociates?: string;

  @MaxLength(2000)
  locations?: string;

  @MaxLength(5000)
  description?: string;

  @MaxLength(2000)
  sources?: string;

  @Min(0)
  @Max(100)
  riskScore?: number;
}

export class UpdateHumanProfileDto {
  @MaxLength(200)
  name?: string;

  @MaxLength(500)
  aliases?: string;

  @MaxLength(20)
  dateOfBirth?: string;

  @MaxLength(200)
  placeOfBirth?: string;

  @MaxLength(200)
  profession?: string;

  @MaxLength(1000)
  socialMedia?: string;

  @MaxLength(2000)
  images?: string;

  @MaxLength(2000)
  knownAssociates?: string;

  @MaxLength(2000)
  locations?: string;

  @MaxLength(5000)
  description?: string;

  @MaxLength(2000)
  sources?: string;

  @Min(0)
  @Max(100)
  riskScore?: number;
}

export class CreateBuildingDto {
  @MaxLength(200)
  name?: string;

  @MaxLength(500)
  address?: string;

  @MaxLength(200)
  city?: string;

  @MaxLength(200)
  country?: string;

  @MaxLength(100)
  buildingType?: string;

  @MaxLength(10)
  constructionYear?: string;

  @MaxLength(200)
  architect?: string;

  @MaxLength(100)
  coordinates?: string;

  @MaxLength(200)
  owner?: string;

  @MaxLength(200)
  usage?: string;

  @MaxLength(2000)
  images?: string;

  @MaxLength(5000)
  description?: string;

  @MaxLength(2000)
  sources?: string;
}

export class UpdateBuildingDto {
  @MaxLength(200)
  name?: string;

  @MaxLength(500)
  address?: string;

  @MaxLength(200)
  city?: string;

  @MaxLength(200)
  country?: string;

  @MaxLength(100)
  buildingType?: string;

  @MaxLength(10)
  constructionYear?: string;

  @MaxLength(200)
  architect?: string;

  @MaxLength(100)
  coordinates?: string;

  @MaxLength(200)
  owner?: string;

  @MaxLength(200)
  usage?: string;

  @MaxLength(2000)
  images?: string;

  @MaxLength(5000)
  description?: string;

  @MaxLength(2000)
  sources?: string;
}

export class CreateObjectDto {
  @MaxLength(200)
  name?: string;

  @MaxLength(100)
  category?: string;

  @MaxLength(100)
  brand?: string;

  @MaxLength(100)
  model?: string;

  @MaxLength(5000)
  description?: string;

  @MaxLength(2000)
  specifications?: string;

  @MaxLength(2000)
  images?: string;

  @MaxLength(100)
  estimatedValue?: string;

  @MaxLength(50)
  rarity?: string;

  @MaxLength(200)
  origin?: string;

  @MaxLength(2000)
  sources?: string;
}

export class UpdateObjectDto {
  @MaxLength(200)
  name?: string;

  @MaxLength(100)
  category?: string;

  @MaxLength(100)
  brand?: string;

  @MaxLength(100)
  model?: string;

  @MaxLength(5000)
  description?: string;

  @MaxLength(2000)
  specifications?: string;

  @MaxLength(2000)
  images?: string;

  @MaxLength(100)
  estimatedValue?: string;

  @MaxLength(50)
  rarity?: string;

  @MaxLength(200)
  origin?: string;

  @MaxLength(2000)
  sources?: string;
}
