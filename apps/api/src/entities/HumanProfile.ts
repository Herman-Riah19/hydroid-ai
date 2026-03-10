import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Property } from "@tsed/schema";

@Entity()
export class HumanProfile {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id!: string;

  @Column({ nullable: true })
  @Property()
  name?: string;

  @Column({ nullable: true })
  @Property()
  aliases?: string;

  @Column({ nullable: true })
  @Property()
  dateOfBirth?: string;

  @Column({ nullable: true })
  @Property()
  placeOfBirth?: string;

  @Column({ nullable: true })
  @Property()
  profession?: string;

  @Column({ nullable: true })
  @Property()
  socialMedia?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  images?: string;

  @Column({ nullable: true })
  @Property()
  knownAssociates?: string;

  @Column({ nullable: true })
  @Property()
  locations?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  description?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  sources?: string;

  @Column({ type: "float", nullable: true })
  @Property()
  riskScore?: number;

  @CreateDateColumn()
  @Property()
  createdAt!: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt!: Date;
}
