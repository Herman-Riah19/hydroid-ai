import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import { Property } from "@tsed/schema";
import { Role } from "./enums/index.js";

@Entity()
@Unique(["userId", "organizationId"])
export class Member {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id!: string;

  @Column()
  @Property()
  userId!: string;

  @Column()
  @Property()
  organizationId!: string;

  @Column({ type: "varchar", default: Role.VIEWER })
  @Property()
  role!: Role;

  @ManyToOne("User", "members", { onDelete: "CASCADE" })
  user!: any;

  @CreateDateColumn()
  @Property()
  createdAt!: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt!: Date;
}
