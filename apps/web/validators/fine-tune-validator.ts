import z from "zod";

export const CreateAIModelSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  provider: z
    .string()
    .min(1, "Provider is required")
    .max(50, "Provider must be less than 50 characters"),
  modelType: z.string().min(1, "Model type is required"),
  baseModel: z
    .string()
    .max(100, "Base model must be less than 100 characters")
    .optional(),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  parameters: z
    .string()
    .max(50, "Parameters must be less than 50 characters")
    .optional(),
  contextLength: z.number().min(1).max(100000).optional(),
  pricing: z
    .string()
    .max(200, "Pricing must be less than 200 characters")
    .optional(),
});

export const CreateLoRAConfigSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  rank: z.number().min(1).max(256).optional(),
  alpha: z.number().min(1).max(512).optional(),
  dropout: z.number().min(0).max(1).optional(),
  targetModules: z
    .string()
    .max(500, "Target modules must be less than 500 characters")
    .optional(),
  modelId: z.string().optional(),
});

export const CreateFineTuneJobSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  modelId: z.string().min(1, "Model ID is required"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  trainingData: z.string().max(10000).optional(),
  validationData: z.string().max(10000).optional(),
  hyperparameters: z.string().max(2000).optional(),
  baseModel: z
    .string()
    .min(1, "Base model is required")
    .max(100, "Base model must be less than 100 characters"),
  epochs: z.number().min(1).max(100).optional(),
  batchSize: z.number().min(1).max(512).optional(),
  learningRate: z.number().min(0.0001).max(0.1).optional(),
  loraConfigId: z.string().optional(),
});

export const UpdateFineTuneJobSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  epochs: z.number().min(1).max(100).optional(),
  batchSize: z.number().min(1).max(512).optional(),
  learningRate: z.number().min(0.0001).max(0.1).optional(),
  hyperparameters: z.string().max(2000).optional(),
});

export type CreateAIModelFormData = z.infer<typeof CreateAIModelSchema>;
export type CreateLoRAConfigFormData = z.infer<typeof CreateLoRAConfigSchema>;
export type CreateFineTuneJobFormData = z.infer<typeof CreateFineTuneJobSchema>;
export type UpdateFineTuneJobFormData = z.infer<typeof UpdateFineTuneJobSchema>;
