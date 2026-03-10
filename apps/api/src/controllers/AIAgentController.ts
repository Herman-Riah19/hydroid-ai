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
  Groups,
} from "@tsed/schema";
import { AIAgentService } from "src/services/AIAgentService";
import { AgentTaskService } from "src/services/AgentTaskService";
import { AgentExecutionService } from "src/services/AgentExecutionService";
import { AIAgent } from "../entities/AIAgent.js";
import { Docs } from "@tsed/swagger";

@Controller("/agents")
@Docs("api-docs")
export class AIAgentController {
  @Inject()
  private agentService!: AIAgentService;

  @Inject()
  private taskService!: AgentTaskService;

  @Inject()
  private executionService!: AgentExecutionService;

  @Post("/")
  @Title("Create AI Agent")
  @Summary("Create a new autonomous AI agent")
  @Description(
    "Create a new AI agent with specified capabilities and configuration",
  )
  @Returns(201, AIAgent)
  async createAgent(
    @BodyParams()
    body: {
      userId: string;
      name: string;
      description?: string;
      agentType: string;
      capabilities?: string;
      modelProvider?: string;
      modelName?: string;
    },
  ): Promise<AIAgent> {
    return this.agentService.createAgent(body as any);
  }

  @Get("/")
  @Title("Get All Agents")
  @Summary("List all AI agents")
  @Description("Retrieve all AI agents for the current user")
  @Returns(200, Array)
  async getAllAgents(
    @QueryParams("userId") userId?: string,
    @QueryParams("status") status?: string,
    @QueryParams("type") agentType?: string,
  ): Promise<AIAgent[]> {
    if (userId) {
      if (status) {
        return this.agentService.findByStatus(userId, status as any);
      }
      if (agentType) {
        return this.agentService.findByType(userId, agentType as any);
      }
      return this.agentService.findByUser(userId);
    }
    return this.agentService.repository.find();
  }

  @Get("/:id")
  @Title("Get Agent")
  @Summary("Get a single AI agent by ID")
  @Description("Retrieve detailed information about a specific AI agent")
  @Returns(200, Object)
  async getAgent(@PathParams("id") id: string): Promise<AIAgent | null> {
    return this.agentService.getWithExecutions(id);
  }

  @Put("/:id")
  @Title("Update Agent")
  @Summary("Update an AI agent")
  @Description("Update the configuration and settings of an AI agent")
  @Returns(200, Object)
  async updateAgent(
    @PathParams("id") id: string,
    @BodyParams() body: Partial<AIAgent>,
  ): Promise<AIAgent> {
    return this.agentService.update(id, body);
  }

  @Delete("/:id")
  @Title("Delete Agent")
  @Summary("Delete an AI agent")
  @Description("Remove an AI agent and all its associated data")
  @Status(204)
  async deleteAgent(@PathParams("id") id: string): Promise<void> {
    await this.agentService.delete(id);
  }

  @Post("/:id/activate")
  @Title("Activate Agent")
  @Summary("Activate an AI agent")
  @Description("Start an AI agent making it ready to process tasks")
  @Returns(200, Object)
  async activateAgent(@PathParams("id") id: string): Promise<AIAgent> {
    return this.agentService.activate(id);
  }

  @Post("/:id/deactivate")
  @Title("Deactivate Agent")
  @Summary("Deactivate an AI agent")
  @Description("Stop an AI agent")
  @Returns(200, Object)
  async deactivateAgent(@PathParams("id") id: string): Promise<AIAgent> {
    return this.agentService.deactivate(id);
  }

  @Post("/:id/tasks")
  @Title("Create Task")
  @Summary("Create a task for an agent")
  @Description("Define a new task that this agent can perform")
  @Returns(201, Object)
  async createTask(
    @PathParams("id") agentId: string,
    @BodyParams()
    body: {
      name: string;
      description?: string;
      inputSchema?: string;
      outputSchema?: string;
    },
  ): Promise<any> {
    return this.taskService.createTask({
      agentId,
      ...body,
    });
  }

  @Get("/:id/tasks")
  @Title("Get Agent Tasks")
  @Summary("List all tasks for an agent")
  @Description("Retrieve all tasks defined for a specific agent")
  @Returns(200, Array)
  async getAgentTasks(@PathParams("id") agentId: string): Promise<any[]> {
    return this.taskService.findByAgent(agentId);
  }

  @Post("/:id/execute")
  @Title("Execute Agent Task")
  @Summary("Execute a task with the agent")
  @Description("Run a specific task with the provided input")
  @Returns(202, Object)
  async executeTask(
    @PathParams("id") agentId: string,
    @BodyParams()
    body: {
      taskId: string;
      input: string;
    },
  ): Promise<any> {
    return this.executionService.createExecution({
      agentId,
      taskId: body.taskId,
      input: body.input,
    });
  }

  @Get("/:id/executions")
  @Title("Get Agent Executions")
  @Summary("List all executions for an agent")
  @Description("Retrieve the execution history of an agent")
  @Returns(200, Array)
  async getAgentExecutions(
    @PathParams("id") agentId: string,
    @QueryParams("status") status?: string,
  ): Promise<any[]> {
    return this.executionService.findByAgent(agentId, status as any);
  }

  @Get("/executions/:executionId")
  @Title("Get Execution Status")
  @Summary("Get the status of an execution")
  @Description("Check the current status and output of an execution")
  @Returns(200, Object)
  async getExecution(
    @PathParams("executionId") executionId: string,
  ): Promise<any> {
    return this.executionService.repository.findOne({
      where: { id: executionId },
      relations: ["task", "agent"],
    });
  }
}
