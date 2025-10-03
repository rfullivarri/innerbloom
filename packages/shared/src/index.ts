export interface HealthResponse {
  status: "ok";
  uptime: number;
  timestamp: string;
}

export interface ApiResult<T> {
  data: T | null;
  error?: string;
}

export const toApiResult = <T>(data: T | null, error?: string): ApiResult<T> => ({
  data,
  error
});

export const isoTimestamp = (): string => new Date().toISOString();
