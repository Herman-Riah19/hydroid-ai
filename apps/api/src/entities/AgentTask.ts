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

@Entity()
export class AgentTask {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id!: string;

  @Column()
  @Property()
  agentId!: string;

  @Column()
  @Property()
  name!: string;

  @Column({ nullable: true })
  @Property()
  description?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  inputSchema?: string;

  @Column({ type: "text", nullable: true })
  @Property()
  outputSchema?: string;

  @ManyToOne("AIAgent", "tasks", { onDelete: "CASCADE" })
  agent!: any;

  @OneToMany("AgentExecution", "task")
  executions!: any[];

  @CreateDateColumn()
  @Property()
  createdAt!: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt!: Date;
}
