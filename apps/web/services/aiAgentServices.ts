import { headersAuthFetch } from "@/utils/header-fetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class AIAgentServices {
  static async createAgent(
    agentData: {
      userId: string;
      name: string;
      description?: string;
      agentType: string;
      capabilities?: string;
      modelProvider?: string;
      modelName?: string;
    },
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/agents`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify(agentData),
    });
    return res.json();
  }

  static async getAllAgents(
    token: string,
    params?: { userId?: string; status?: string; type?: string },
  ) {
    const header = headersAuthFetch(token);
    const queryParams = new URLSearchParams();
    if (params?.userId) queryParams.append("userId", params.userId);
    if (params?.status) queryParams.append("status", params.status);
    if (params?.type) queryParams.append("type", params.type);

    const url = queryParams.toString()
      ? `${API_URL}/api/agents?${queryParams}`
      : `${API_URL}/api/agents`;

    const res = await fetch(url, header);
    return res.json();
  }

  static async getAgentById(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/agents/${id}`, header);
    return res.json();
  }

  static async updateAgent(id: string, agentData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/agents/${id}`, {
      method: "PUT",
      headers: header.headers,
      body: JSON.stringify(agentData),
    });
    return res.json();
  }

  static async deleteAgent(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/agents/${id}`, {
      method: "DELETE",
      headers: header.headers,
    });
    return res.json();
  }

  static async activateAgent(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/agents/${id}/activate`, {
      method: "POST",
      headers: header.headers,
    });
    return res.json();
  }

  static async deactivateAgent(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/agents/${id}/deactivate`, {
      method: "POST",
      headers: header.headers,
    });
    return res.json();
  }

  static async createTask(
    agentId: string,
    taskData: {
      name: string;
      description?: string;
      inputSchema?: string;
      outputSchema?: string;
    },
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/agents/${agentId}/tasks`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify(taskData),
    });
    return res.json();
  }

  static async getAgentTasks(agentId: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/agents/${agentId}/tasks`, header);
    return res.json();
  }

  static async executeTask(
    agentId: string,
    executionData: {
      taskId: string;
      input: string;
    },
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/agents/${agentId}/execute`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify(executionData),
    });
    return res.json();
  }

  static async getAgentExecutions(
    agentId: string,
    token: string,
    status?: string,
  ) {
    const header = headersAuthFetch(token);
    const url = status
      ? `${API_URL}/api/agents/${agentId}/executions?status=${status}`
      : `${API_URL}/api/agents/${agentId}/executions`;
    const res = await fetch(url, header);
    return res.json();
  }

  static async getExecution(executionId: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${API_URL}/api/agents/executions/${executionId}`,
      header,
    );
    return res.json();
  }
}
