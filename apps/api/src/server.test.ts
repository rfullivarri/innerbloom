import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

process.env.PORT = process.env.PORT ?? "0";
process.env.API_CORS_ORIGIN = process.env.API_CORS_ORIGIN ?? "http://localhost:5173";
process.env.NODE_ENV = "test";

import app, { createApp } from "./server.js";

describe("api routes", () => {
  let testApp = app;

  beforeAll(() => {
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

  it("pongs", async () => {
    const response = await request(testApp).get("/v1/ping");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ pong: true });
  });
});
