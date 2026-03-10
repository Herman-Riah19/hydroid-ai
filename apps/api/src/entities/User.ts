import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Property, Required } from "@tsed/schema";
import { Role } from "./enums/index.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id!: string;

  @Column({ unique: true })
  @Required()
  @Property()
  email!: string;

  @Column({ nullable: true })
  @Property()
  name?: string;

  @Column({ type: "varchar", default: Role.VIEWER })
  @Property()
  role!: Role;

  @Column({ nullable: true })
  @Property()
  password?: string;

  @Column({ nullable: true })
  @Property()
  avatar?: string;

  @Column({ default: false })
  @Property()
  isPremium!: boolean;

  @Column({ type: "datetime", nullable: true })
  @Property()
  premiumUntil?: Date;

  @OneToMany("Member", "user")
  members!: any[];

  @OneToMany("AIAgent", "user")
  agents!: any[];

  @OneToMany("FineTuneJob", "user")
  fineTuneJobs!: any[];

  @OneToMany("OsintSearch", "user")
  osintSearches!: any[];

  @CreateDateColumn()
  @Property()
  createdAt!: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt!: Date;
}
