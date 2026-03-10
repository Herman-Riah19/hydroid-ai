import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Property } from "@tsed/schema";
import { ExecutionStatus } from "./enums/index.js";

@Entity()
export class AgentExecution {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id!: string;

  @Column()
  @Property()
  taskId!: string;

  @Column()
  @Property()
  agentId!: string;

  @Column({ type: "varchar", default: ExecutionStatus.PENDING })
  @Property()
  status!: ExecutionStatus;

  @Column({ type: "text", nullable: true })
  @Property()
  input?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  output?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  error?: string;

  @Column({ type: "datetime", nullable: true })
  @Property()
  startedAt?: Date;

  @Column({ type: "datetime", nullable: true })
  @Property()
  completedAt?: Date;

  @ManyToOne("AgentTask", "executions", { onDelete: "CASCADE" })
  task!: any;

  @ManyToOne("AIAgent", "executions", { onDelete: "CASCADE" })
  agent!: any;

  @CreateDateColumn()
  @Property()
  createdAt!: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt!: Date;
}
