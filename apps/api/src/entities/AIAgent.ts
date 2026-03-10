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
import { AgentType, AgentStatus } from "./enums/index.js";

@Entity()
export class AIAgent {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id!: string;

  @Column()
  @Property()
  userId!: string;

  @Column()
  @Property()
  name!: string;

  @Column({ nullable: true })
  @Property()
  description?: string;

  @Column({ type: "varchar" })
  @Property()
  agentType!: AgentType;

  @Column({ type: "varchar", default: AgentStatus.INACTIVE })
  @Property()
  status!: AgentStatus;

  @Column({ type: "text", nullable: true })
  @Property()
  config?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  capabilities?: string;

  @Column({ nullable: true })
  @Property()
  modelProvider?: string;

  @Column({ nullable: true })
  @Property()
  modelName?: string;

  @OneToMany("AgentTask", "agent")
  tasks!: any[];

  @OneToMany("AgentExecution", "agent")
  executions!: any[];

  @ManyToOne("User", "agents", { onDelete: "CASCADE" })
  user!: any;

  @CreateDateColumn()
  @Property()
  createdAt!: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt!: Date;
}
