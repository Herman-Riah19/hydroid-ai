import { Controller, Inject } from "@tsed/di";
import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";
import {
  Get,
  Post,
  Put,
  Delete,
  Returns,
  Summary,
  Title,
  Description,
  Status,
} from "@tsed/schema";
import { AIModelService } from "src/services/AIModelService";
import { LoRAConfigService } from "src/services/LoRAConfigService";
import { FineTuneJobService } from "src/services/FineTuneJobService";
import { AIModel } from "../entities/AIModel.js";
import { LoRAConfig } from "../entities/LoRAConfig.js";
import { FineTuneJob } from "../entities/FineTuneJob.js";
import { Docs } from "@tsed/swagger";

@Controller("/ai-models")
@Docs("api-docs")
export class AIModelController {
  @Inject()
  private modelService!: AIModelService;

  @Post("/")
  @Title("Create AI Model")
  @Summary("Register a new AI model")
  @Description("Add a new AI model to the platform for fine-tuning")
  @Returns(201, AIModel)
  async createModel(
    @BodyParams()
    body: {
      name: string;
      provider: string;
      modelType: string;
      baseModel?: string;
      description?: string;
      parameters?: string;
      contextLength?: number;
      pricing?: string;
    },
  ): Promise<AIModel> {
    return this.modelService.createModel(body as any);
  }

  @Get("/")
  @Title("Get AI Models")
  @Summary("List all available AI models")
  @Description("Retrieve all AI models with optional filtering")
  @Returns(200, Array)
  async getAllModels(
    @QueryParams("provider") provider?: string,
    @QueryParams("type") modelType?: string,
    @QueryParams("status") status?: string,
  ): Promise<AIModel[]> {
    if (provider) return this.modelService.findByProvider(provider);
    if (modelType) return this.modelService.findByType(modelType as any);
    if (status)
      return this.modelService.repository.find({
        where: { status: status as any },
      });
    return this.modelService.findAvailable();
  }

  @Get("/:id")
  @Title("Get Model")
  @Summary("Get a single AI model")
  @Description("Retrieve detailed information about a specific model")
  @Returns(200, Object)
  async getModel(@PathParams("id") id: string): Promise<AIModel | null> {
    return this.modelService.repository.findOne({
      where: { id },
      relations: ["loraConfigs", "fineTuneJobs"],
    });
  }

  @Put("/:id")
  @Title("Update Model")
  @Summary("Update AI model information")
  @Description("Update model details and configuration")
  @Returns(200, Object)
  async updateModel(
    @PathParams("id") id: string,
    @BodyParams() body: Partial<AIModel>,
  ): Promise<AIModel> {
    return this.modelService.update(id, body);
  }

  @Delete("/:id")
  @Title("Delete Model")
  @Summary("Remove an AI model")
  @Description("Remove a model from the platform")
  @Status(204)
  async deleteModel(@PathParams("id") id: string): Promise<void> {
    await this.modelService.delete(id);
  }
}

@Controller("/lora-configs")
@Docs("api-docs")
export class LoRAConfigController {
  @Inject()
  private loraService!: LoRAConfigService;

  @Post("/")
  @Title("Create LoRA Config")
  @Summary("Create a new LoRA configuration")
  @Description("Define parameters for LoRA (Low-Rank Adaptation) fine-tuning")
  @Returns(201, LoRAConfig)
  async createLoRAConfig(
    @BodyParams()
    body: {
      name: string;
      description?: string;
      rank?: number;
      alpha?: number;
      dropout?: number;
      targetModules?: string;
      modelId?: string;
    },
  ): Promise<LoRAConfig> {
    return this.loraService.createLoRAConfig(body);
  }

  @Get("/")
  @Title("Get LoRA Configs")
  @Summary("List all LoRA configurations")
  @Description("Retrieve all LoRA configs, optionally filtered by model")
  @Returns(200, Array)
  async getAllLoRAConfigs(
    @QueryParams("modelId") modelId?: string,
  ): Promise<LoRAConfig[]> {
    if (modelId) return this.loraService.findByModel(modelId);
    return this.loraService.repository.find();
  }

  @Get("/:id")
  @Title("Get LoRA Config")
  @Summary("Get a single LoRA configuration")
  @Description("Retrieve detailed LoRA configuration")
  @Returns(200, Object)
  async getLoRAConfig(
    @PathParams("id") id: string,
  ): Promise<LoRAConfig | null> {
    return this.loraService.findOne(id);
  }

  @Put("/:id")
  @Title("Update LoRA Config")
  @Summary("Update LoRA parameters")
  @Description("Modify LoRA configuration parameters")
  @Returns(200, Object)
  async updateLoRAConfig(
    @PathParams("id") id: string,
    @BodyParams() body: Partial<LoRAConfig>,
  ): Promise<LoRAConfig> {
    return this.loraService.updateLoRAConfig(id, body);
  }

  @Delete("/:id")
  @Title("Delete LoRA Config")
  @Summary("Remove a LoRA configuration")
  @Description("Delete a LoRA configuration")
  @Status(204)
  async deleteLoRAConfig(@PathParams("id") id: string): Promise<void> {
    await this.loraService.delete(id);
  }
}

@Controller("/fine-tuning")
@Docs("api-docs")
export class FineTuneController {
  @Inject()
  private fineTuneService!: FineTuneJobService;

  @Post("/")
  @Title("Create Fine-Tuning Job")
  @Summary("Start a new fine-tuning job")
  @Description(
    "Initiate a fine-tuning process on a base model with custom data",
  )
  @Returns(201, FineTuneJob)
  async createFineTuneJob(
    @BodyParams()
    body: {
      userId: string;
      modelId: string;
      name: string;
      trainingData?: string;
      validationData?: string;
      hyperparameters?: string;
      baseModel: string;
      epochs?: number;
      batchSize?: number;
      learningRate?: number;
    },
  ): Promise<FineTuneJob> {
    return this.fineTuneService.createJob(body as any);
  }

  @Get("/")
  @Title("Get Fine-Tuning Jobs")
  @Summary("List all fine-tuning jobs")
  @Description("Retrieve all fine-tuning jobs with optional filtering")
  @Returns(200, Array)
  async getAllFineTuneJobs(
    @QueryParams("userId") userId?: string,
    @QueryParams("status") status?: string,
    @QueryParams("modelId") modelId?: string,
  ): Promise<FineTuneJob[]> {
    if (userId) return this.fineTuneService.findByUser(userId);
    if (status) return this.fineTuneService.findByStatus(status as any);
    if (modelId) return this.fineTuneService.findByModel(modelId);
    return this.fineTuneService.repository.find();
  }

  @Get("/:id")
  @Title("Get Fine-Tuning Job")
  @Summary("Get a single fine-tuning job")
  @Description("Retrieve detailed information about a fine-tuning job")
  @Returns(200, Object)
  async getFineTuneJob(
    @PathParams("id") id: string,
  ): Promise<FineTuneJob | null> {
    return this.fineTuneService.getWithDetails(id);
  }

  @Put("/:id")
  @Title("Update Fine-Tuning Job")
  @Summary("Update fine-tuning job parameters")
  @Description("Modify hyperparameters or configuration of a pending job")
  @Returns(200, Object)
  async updateFineTuneJob(
    @PathParams("id") id: string,
    @BodyParams() body: Partial<FineTuneJob>,
  ): Promise<FineTuneJob> {
    return this.fineTuneService.update(id, body);
  }

  @Post("/:id/start")
  @Title("Start Fine-Tuning")
  @Summary("Start a fine-tuning job")
  @Description("Begin the fine-tuning process")
  @Returns(200, Object)
  async startFineTuneJob(@PathParams("id") id: string): Promise<FineTuneJob> {
    return this.fineTuneService.startJob(id);
  }

  @Post("/:id/cancel")
  @Title("Cancel Fine-Tuning")
  @Summary("Cancel a fine-tuning job")
  @Description("Stop an ongoing or pending fine-tuning job")
  @Returns(200, Object)
  async cancelFineTuneJob(@PathParams("id") id: string): Promise<FineTuneJob> {
    return this.fineTuneService.cancelJob(id);
  }

  @Delete("/:id")
  @Title("Delete Fine-Tuning Job")
  @Summary("Remove a fine-tuning job")
  @Description("Delete a fine-tuning job and its associated data")
  @Status(204)
  async deleteFineTuneJob(@PathParams("id") id: string): Promise<void> {
    await this.fineTuneService.delete(id);
  }

  @Get("/:id/metrics")
  @Title("Get Fine-Tuning Metrics")
  @Summary("Get training metrics")
  @Description("Retrieve loss, metrics and evaluation results from fine-tuning")
  @Returns(200, Object)
  async getFineTuneMetrics(@PathParams("id") id: string): Promise<any> {
    const job = await this.fineTuneService.getWithDetails(id);
    if (!job) return { error: "Job not found" };
    return {
      loss: job.loss,
      metrics: job.metrics,
      status: job.status,
      epochs: job.epochs,
    };
  }
}
