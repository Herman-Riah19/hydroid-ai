import { Required, MaxLength, Min, Max } from "@tsed/schema";

export class CreateAIModelDto {
  @Required()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @Required()
  @MaxLength(50)
  provider!: string;

  @Required()
  modelType!: string;

  @MaxLength(100)
  baseModel?: string;

  @MaxLength(500)
  description?: string;

  @MaxLength(50)
  parameters?: string;

  @Min(1)
  @Max(100000)
  contextLength?: number;

  @MaxLength(200)
  pricing?: string;
}

export class UpdateAIModelDto {
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @MaxLength(50)
  provider?: string;

  modelType?: string;
  status?: string;

  @MaxLength(500)
  description?: string;

  @MaxLength(50)
  parameters?: string;

  @Min(1)
  @Max(100000)
  contextLength?: number;

  @MaxLength(200)
  pricing?: string;
}

export class CreateLoRAConfigDto {
  @Required()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @MaxLength(500)
  description?: string;

  @Min(1)
  @Max(256)
  rank?: number;

  @Min(1)
  @Max(512)
  alpha?: number;

  @Min(0)
  @Max(1)
  dropout?: number;

  @MaxLength(500)
  targetModules?: string;

  modelId?: string;
}

export class UpdateLoRAConfigDto {
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @MaxLength(500)
  description?: string;

  @Min(1)
  @Max(256)
  rank?: number;

  @Min(1)
  @Max(512)
  alpha?: number;

  @Min(0)
  @Max(1)
  dropout?: number;

  @MaxLength(500)
  targetModules?: string;
}

export class CreateFineTuneJobDto {
  @Required()
  userId!: string;

  @Required()
  modelId!: string;

  @Required()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @MaxLength(10000)
  trainingData?: string;

  @MaxLength(10000)
  validationData?: string;

  @MaxLength(2000)
  hyperparameters?: string;

  @Required()
  @MaxLength(100)
  baseModel!: string;

  @Min(1)
  @Max(100)
  epochs?: number;

  @Min(1)
  @Max(512)
  batchSize?: number;

  @Min(0.0001)
  @Max(0.1)
  learningRate?: number;

  loraConfigId?: string;
}

export class UpdateFineTuneJobDto {
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @Min(1)
  @Max(100)
  epochs?: number;

  @Min(1)
  @Max(512)
  batchSize?: number;

  @Min(0.0001)
  @Max(0.1)
  learningRate?: number;

  @MaxLength(2000)
  hyperparameters?: string;
}
