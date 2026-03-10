import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Property } from "@tsed/schema";
import { ModelType, ModelStatus } from "./enums/index.js";

@Entity()
export class AIModel {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id!: string;

  @Column()
  @Property()
  name!: string;

  @Column()
  @Property()
  provider!: string;

  @Column({ type: "varchar" })
  @Property()
  modelType!: ModelType;

  @Column({ type: "varchar", default: ModelStatus.AVAILABLE })
  @Property()
  status!: ModelStatus;

  @Column({ nullable: true })
  @Property()
  baseModel?: string;

  @Column({ nullable: true })
  @Property()
  description?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  parameters?: string;

  @Column({ type: "int", nullable: true })
  @Property()
  contextLength?: number;

  @Column({ nullable: true })
  @Property()
  pricing?: string;

  @OneToMany("FineTuneJob", "model")
  fineTuneJobs!: any[];

  @OneToMany("LoRAConfig", "model")
  loraConfigs!: any[];

  @CreateDateColumn()
  @Property()
  createdAt!: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt!: Date;
}
