import { Required, MaxLength, MinLength, Min, Max } from "@tsed/schema";

export class CreateWeaponDto {
  @Required()
  @MinLength(2)
  @MaxLength(200)
  name!: string;

  @Required()
  category!: string;

  @MaxLength(100)
  subcategory?: string;

  @MaxLength(200)
  manufacturer?: string;

  @MaxLength(100)
  country?: string;

  @MaxLength(10)
  yearIntroduced?: string;

  @MaxLength(5000)
  description?: string;

  @MaxLength(10000)
  history?: string;

  @MaxLength(2000)
  use?: string;

  @MaxLength(50)
  caliber?: string;

  @MaxLength(50)
  weight?: string;

  @MaxLength(50)
  length?: string;

  @MaxLength(50)
  barrelLength?: string;

  @MaxLength(50)
  muzzleVelocity?: string;

  @MaxLength(50)
  effectiveRange?: string;

  @MaxLength(50)
  capacity?: string;

  @MaxLength(50)
  action?: string;

  @MaxLength(2000)
  images?: string;

  @MaxLength(2000)
  videos?: string;

  isAutomatic?: boolean;

  isPremium?: boolean;

  @MaxLength(2000)
  sources?: string;
}

export class UpdateWeaponDto {
  @MinLength(2)
  @MaxLength(200)
  name?: string;

  category?: string;

  @MaxLength(100)
  subcategory?: string;

  @MaxLength(200)
  manufacturer?: string;

  @MaxLength(100)
  country?: string;

  @MaxLength(10)
  yearIntroduced?: string;

  @MaxLength(5000)
  description?: string;

  @MaxLength(10000)
  history?: string;

  @MaxLength(2000)
  use?: string;

  @MaxLength(50)
  caliber?: string;

  @MaxLength(50)
  weight?: string;

  @MaxLength(50)
  length?: string;

  @MaxLength(50)
  barrelLength?: string;

  @MaxLength(50)
  muzzleVelocity?: string;

  @MaxLength(50)
  effectiveRange?: string;

  @MaxLength(50)
  capacity?: string;

  @MaxLength(50)
  action?: string;

  @MaxLength(2000)
  images?: string;

  @MaxLength(2000)
  videos?: string;

  isAutomatic?: boolean;

  isPremium?: boolean;

  @MaxLength(2000)
  sources?: string;
}
