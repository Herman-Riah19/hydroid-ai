import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Property } from "@tsed/schema";
import { OsintType, SearchStatus } from "./enums/index.js";

@Entity()
export class OsintSearch {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id!: string;

  @Column()
  @Property()
  userId!: string;

  @Column({ type: "varchar" })
  @Property()
  searchType!: OsintType;

  @Column()
  @Property()
  query!: string;

  @Column({ type: "simple-json", nullable: true })
  @Property()
  result?: Record<string, any>;

  @Column({ nullable: true })
  @Property()
  source?: string;

  @Column({ type: "float", nullable: true })
  @Property()
  confidence?: number;

  @Column({ type: "varchar", default: SearchStatus.PENDING })
  @Property()
  status!: SearchStatus;

  @ManyToOne("User", "osintSearches", { onDelete: "CASCADE" })
  user!: any;

  @CreateDateColumn()
  @Property()
  createdAt!: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt!: Date;
}
