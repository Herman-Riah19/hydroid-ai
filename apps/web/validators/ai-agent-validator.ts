import z from "zod";

export const CreateAIAgentSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  agentType: z.string().min(1, "Agent type is required"),
  capabilities: z
    .string()
    .max(1000, "Capabilities must be less than 1000 characters")
    .optional(),
  modelProvider: z
    .string()
    .max(50, "Model provider must be less than 50 characters")
    .optional(),
  modelName: z
    .string()
    .max(50, "Model name must be less than 50 characters")
    .optional(),
});

export const UpdateAIAgentSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional(),
  agentType: z.string().optional(),
  status: z.string().optional(),
  capabilities: z.string().max(1000).optional(),
  modelProvider: z.string().max(50).optional(),
  modelName: z.string().max(50).optional(),
});

export const CreateAgentTaskSchema = z.object({
  agentId: z.string().min(1, "Agent ID is required"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  inputSchema: z.string().max(2000).optional(),
  outputSchema: z.string().max(2000).optional(),
});

export const ExecuteAgentTaskSchema = z.object({
  taskId: z.string().min(1, "Task ID is required"),
  input: z.string().min(1, "Input is required"),
});

export type CreateAIAgentFormData = z.infer<typeof CreateAIAgentSchema>;
export type UpdateAIAgentFormData = z.infer<typeof UpdateAIAgentSchema>;
export type CreateAgentTaskFormData = z.infer<typeof CreateAgentTaskSchema>;
export type ExecuteAgentTaskFormData = z.infer<typeof ExecuteAgentTaskSchema>;
