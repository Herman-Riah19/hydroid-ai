import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Property } from "@tsed/schema";

@Entity()
export class LoRAConfig {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id!: string;

  @Column()
  @Property()
  name!: string;

  @Column({ nullable: true })
  @Property()
  description?: string;

  @Column({ type: "int", default: 8 })
  @Property()
  rank!: number;

  @Column({ type: "int", default: 16 })
  @Property()
  alpha!: number;

  @Column({ type: "float", default: 0.05 })
  @Property()
  dropout!: number;

  @Column({ nullable: true })
  @Property()
  targetModules?: string;

  @Column({ nullable: true })
  @Property()
  modelId?: string;

  @Column({ nullable: true })
  @Property()
  fineTuneJobId?: string;

  @ManyToOne("AIModel", "loraConfigs", { nullable: true })
  model!: any;

  @ManyToOne("FineTuneJob", "loraConfigs", { nullable: true })
  fineTuneJob!: any;

  @CreateDateColumn()
  @Property()
  createdAt!: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt!: Date;
}
