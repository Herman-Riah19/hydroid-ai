import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Property } from "@tsed/schema";
import { WeaponCategory } from "./enums/index.js";

@Entity()
export class Weapon {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id!: string;

  @Column()
  @Property()
  name!: string;

  @Column({ type: "varchar" })
  @Property()
  category!: WeaponCategory;

  @Column({ nullable: true })
  @Property()
  subcategory?: string;

  @Column({ nullable: true })
  @Property()
  manufacturer?: string;

  @Column({ nullable: true })
  @Property()
  country?: string;

  @Column({ nullable: true })
  @Property()
  yearIntroduced?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  description?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  history?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  use?: string;

  @Column({ nullable: true })
  @Property()
  caliber?: string;

  @Column({ nullable: true })
  @Property()
  weight?: string;

  @Column({ nullable: true })
  @Property()
  length?: string;

  @Column({ nullable: true })
  @Property()
  barrelLength?: string;

  @Column({ nullable: true })
  @Property()
  muzzleVelocity?: string;

  @Column({ nullable: true })
  @Property()
  effectiveRange?: string;

  @Column({ nullable: true })
  @Property()
  capacity?: string;

  @Column({ nullable: true })
  @Property()
  action?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  images?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  videos?: string;

  @Column({ nullable: true })
  @Property()
  isAutomatic?: boolean;

  @Column({ default: true })
  @Property()
  isPremium!: boolean;

  @Column({ type: "text", nullable: true })
  @Property()
  sources?: string;

  @CreateDateColumn()
  @Property()
  createdAt!: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt!: Date;
}
