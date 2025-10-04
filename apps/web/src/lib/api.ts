export type ApiResult<T> = {
  data: T | null;
  error?: string;
};

export type HealthResponse = {
  status: string;
  uptime: number;
  timestamp: string;
};

export type PingResponse = {
  pong: boolean;
  userId: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

export const api = {
  async getHealth(): Promise<ApiResult<HealthResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = (await response.json()) as HealthResponse;
      return { data };
    } catch (error) {
      return { data: null, error: (error as Error).message };
    }
  },
  async ping(token: string): Promise<ApiResult<PingResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/ping`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = (await response.json()) as PingResponse;
      return { data };
    } catch (error) {
      return { data: null, error: (error as Error).message };
    }
  }
};
