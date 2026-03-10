import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Property } from "@tsed/schema";

@Entity()
export class Building {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id!: string;

  @Column({ nullable: true })
  @Property()
  name?: string;

  @Column({ nullable: true })
  @Property()
  address?: string;

  @Column({ nullable: true })
  @Property()
  city?: string;

  @Column({ nullable: true })
  @Property()
  country?: string;

  @Column({ nullable: true })
  @Property()
  buildingType?: string;

  @Column({ nullable: true })
  @Property()
  constructionYear?: string;

  @Column({ nullable: true })
  @Property()
  architect?: string;

  @Column({ nullable: true })
  @Property()
  coordinates?: string;

  @Column({ nullable: true })
  @Property()
  owner?: string;

  @Column({ nullable: true })
  @Property()
  usage?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  images?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  description?: string;

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
