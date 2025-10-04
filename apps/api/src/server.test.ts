import request from "supertest";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

process.env.PORT = process.env.PORT ?? "0";
process.env.API_CORS_ORIGIN = process.env.API_CORS_ORIGIN ?? "http://localhost:5173";
process.env.NODE_ENV = "test";
process.env.CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY ?? "sk_test_123";
process.env.CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY ?? "pk_test_123";

vi.mock("@clerk/express", () => ({
  clerkMiddleware: () => (_req: unknown, _res: unknown, next: () => void) => next(),
  requireAuth: () => (req: { auth?: { userId: string } }, _res: unknown, next: () => void) => {
    req.auth = { userId: "user_123" };
    next();
  }
}));

type ServerModule = typeof import("./server.js");
type TestAppInstance = ReturnType<ServerModule["createApp"]>;

describe("api routes", () => {
  let testApp: TestAppInstance;

  beforeAll(async () => {
    const { createApp } = await import("./server.js");
    testApp = createApp();
  });

  afterAll(() => {
    testApp.emit("close");
  });

  it("returns health status", async () => {
    const response = await request(testApp).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  it("requires auth for ping and returns user context", async () => {
    const response = await request(testApp).get("/v1/ping").set("Authorization", "Bearer test-token");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ pong: true, userId: "user_123" });
  });
});
