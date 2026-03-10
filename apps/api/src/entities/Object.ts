import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Property } from "@tsed/schema";

@Entity()
export class Item {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id!: string;

  @Column({ nullable: true })
  @Property()
  name?: string;

  @Column({ nullable: true })
  @Property()
  category?: string;

  @Column({ nullable: true })
  @Property()
  brand?: string;

  @Column({ nullable: true })
  @Property()
  model?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  description?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  specifications?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  images?: string;

  @Column({ nullable: true })
  @Property()
  estimatedValue?: string;

  @Column({ nullable: true })
  @Property()
  rarity?: string;

  @Column({ nullable: true })
  @Property()
  origin?: string;

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
