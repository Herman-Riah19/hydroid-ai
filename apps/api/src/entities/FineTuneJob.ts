import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Property } from "@tsed/schema";
import { FineTuneStatus } from "./enums/index.js";

@Entity()
export class FineTuneJob {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id!: string;

  @Column()
  @Property()
  userId!: string;

  @Column()
  @Property()
  modelId!: string;

  @Column()
  @Property()
  name!: string;

  @Column({ type: "varchar", default: FineTuneStatus.PENDING })
  @Property()
  status!: FineTuneStatus;

  @Column({ type: "text", nullable: true })
  @Property()
  trainingData?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  validationData?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  hyperparameters?: string;

  @Column()
  @Property()
  baseModel!: string;

  @Column({ nullable: true })
  @Property()
  trainedModel?: string;

  @Column({ type: "int", default: 3 })
  @Property()
  epochs!: number;

  @Column({ type: "int", nullable: true })
  @Property()
  batchSize?: number;

  @Column({ type: "float", nullable: true })
  @Property()
  learningRate?: number;

  @Column({ type: "text", nullable: true })
  @Property()
  loss?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  metrics?: string;

  @Column({ type: "datetime", nullable: true })
  @Property()
  startTime?: Date;

  @Column({ type: "datetime", nullable: true })
  @Property()
  endTime?: Date;

  @ManyToOne("User", "fineTuneJobs", { onDelete: "CASCADE" })
  user!: any;

  @ManyToOne("AIModel", "fineTuneJobs")
  model!: any;

  @OneToMany("LoRAConfig", "fineTuneJob")
  loraConfigs!: any[];

  @CreateDateColumn()
  @Property()
  createdAt!: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt!: Date;
}
