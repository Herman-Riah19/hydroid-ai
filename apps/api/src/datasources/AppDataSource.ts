import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../entities/User.js";
import { Member } from "../entities/Member.js";
import { AIAgent } from "../entities/AIAgent.js";
import { AgentTask } from "../entities/AgentTask.js";
import { AgentExecution } from "../entities/AgentExecution.js";
import { AIModel } from "../entities/AIModel.js";
import { FineTuneJob } from "../entities/FineTuneJob.js";
import { LoRAConfig } from "../entities/LoRAConfig.js";
import { OsintSearch } from "../entities/OsintSearch.js";
import { HumanProfile } from "../entities/HumanProfile.js";
import { Building } from "../entities/Building.js";
import { Item } from "../entities/Object.js";
import { Weapon } from "../entities/Weapon.js";

const options: DataSourceOptions = {
  name: "default",
  type: "sqlite",
  database: "./data/database.sqlite",
  synchronize: true,
  logging: false,
  entities: [
    User,
    Member,
    AIAgent,
    AgentTask,
    AgentExecution,
    AIModel,
    FineTuneJob,
    LoRAConfig,
    OsintSearch,
    HumanProfile,
    Building,
    Item,
    Weapon,
  ],
};

export const AppDataSource = new DataSource(options);

export async function initDataSource() {
  await AppDataSource.initialize();
  console.log("Connected with typeorm to database: SQLite");
}

export async function closeDataSource() {
  if (AppDataSource.isInitialized) {
    await AppDataSource.close();
  }
}
