import type { ApiResult, HealthResponse } from "@innerbloom/shared";

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
  }
};
