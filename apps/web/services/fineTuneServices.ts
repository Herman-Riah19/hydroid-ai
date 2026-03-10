import { headersAuthFetch } from "@/utils/header-fetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class AIModelServices {
  static async createModel(
    modelData: {
      name: string;
      provider: string;
      modelType: string;
      baseModel?: string;
      description?: string;
      parameters?: string;
      contextLength?: number;
      pricing?: string;
    },
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/ai-models`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify(modelData),
    });
    return res.json();
  }

  static async getAllModels(
    token: string,
    params?: { provider?: string; type?: string; status?: string },
  ) {
    const header = headersAuthFetch(token);
    const queryParams = new URLSearchParams();
    if (params?.provider) queryParams.append("provider", params.provider);
    if (params?.type) queryParams.append("type", params.type);
    if (params?.status) queryParams.append("status", params.status);

    const url = queryParams.toString()
      ? `${API_URL}/api/ai-models?${queryParams}`
      : `${API_URL}/api/ai-models`;

    const res = await fetch(url, header);
    return res.json();
  }

  static async getModelById(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/ai-models/${id}`, header);
    return res.json();
  }

  static async updateModel(id: string, modelData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/ai-models/${id}`, {
      method: "PUT",
      headers: header.headers,
      body: JSON.stringify(modelData),
    });
    return res.json();
  }

  static async deleteModel(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/ai-models/${id}`, {
      method: "DELETE",
      headers: header.headers,
    });
    return res.json();
  }
}

export class LoRAConfigServices {
  static async createLoRAConfig(
    configData: {
      name: string;
      description?: string;
      rank?: number;
      alpha?: number;
      dropout?: number;
      targetModules?: string;
      modelId?: string;
    },
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/lora-configs`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify(configData),
    });
    return res.json();
  }

  static async getAllLoRAConfigs(token: string, modelId?: string) {
    const header = headersAuthFetch(token);
    const url = modelId
      ? `${API_URL}/api/lora-configs?modelId=${modelId}`
      : `${API_URL}/api/lora-configs`;
    const res = await fetch(url, header);
    return res.json();
  }

  static async getLoRAConfigById(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/lora-configs/${id}`, header);
    return res.json();
  }

  static async updateLoRAConfig(id: string, configData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/lora-configs/${id}`, {
      method: "PUT",
      headers: header.headers,
      body: JSON.stringify(configData),
    });
    return res.json();
  }

  static async deleteLoRAConfig(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/lora-configs/${id}`, {
      method: "DELETE",
      headers: header.headers,
    });
    return res.json();
  }
}

export class FineTuneJobServices {
  static async createFineTuneJob(
    jobData: {
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
      loraConfigId?: string;
    },
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/fine-tuning`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify(jobData),
    });
    return res.json();
  }

  static async getAllFineTuneJobs(
    token: string,
    params?: { userId?: string; status?: string; modelId?: string },
  ) {
    const header = headersAuthFetch(token);
    const queryParams = new URLSearchParams();
    if (params?.userId) queryParams.append("userId", params.userId);
    if (params?.status) queryParams.append("status", params.status);
    if (params?.modelId) queryParams.append("modelId", params.modelId);

    const url = queryParams.toString()
      ? `${API_URL}/api/fine-tuning?${queryParams}`
      : `${API_URL}/api/fine-tuning`;

    const res = await fetch(url, header);
    return res.json();
  }

  static async getFineTuneJobById(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/fine-tuning/${id}`, header);
    return res.json();
  }

  static async updateFineTuneJob(id: string, jobData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/fine-tuning/${id}`, {
      method: "PUT",
      headers: header.headers,
      body: JSON.stringify(jobData),
    });
    return res.json();
  }

  static async startFineTuneJob(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/fine-tuning/${id}/start`, {
      method: "POST",
      headers: header.headers,
    });
    return res.json();
  }

  static async cancelFineTuneJob(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/fine-tuning/${id}/cancel`, {
      method: "POST",
      headers: header.headers,
    });
    return res.json();
  }

  static async deleteFineTuneJob(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/fine-tuning/${id}`, {
      method: "DELETE",
      headers: header.headers,
    });
    return res.json();
  }

  static async getFineTuneMetrics(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/fine-tuning/${id}/metrics`, header);
    return res.json();
  }
}
