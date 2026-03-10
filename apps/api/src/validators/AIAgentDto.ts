import { Required, MaxLength, MinLength } from "@tsed/schema";

export class CreateAIAgentDto {
  @Required()
  userId!: string;

  @Required()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @MaxLength(500)
  description?: string;

  @Required()
  agentType!: string;

  @MaxLength(1000)
  capabilities?: string;

  @MaxLength(50)
  modelProvider?: string;

  @MaxLength(50)
  modelName?: string;
}

export class UpdateAIAgentDto {
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @MaxLength(500)
  description?: string;

  agentType?: string;
  status?: string;

  @MaxLength(1000)
  capabilities?: string;

  @MaxLength(50)
  modelProvider?: string;

  @MaxLength(50)
  modelName?: string;
}

export class CreateAgentTaskDto {
  @Required()
  agentId!: string;

  @Required()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @MaxLength(500)
  description?: string;

  @MaxLength(2000)
  inputSchema?: string;

  @MaxLength(2000)
  outputSchema?: string;
}

export class ExecuteAgentTaskDto {
  @Required()
  taskId!: string;

  @Required()
  input!: string;
}
