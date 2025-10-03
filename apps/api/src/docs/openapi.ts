export const openApiDocument = {
  openapi: "3.1.0",
  info: {
    title: "Innerbloom API",
    version: "0.1.0"
  },
  paths: {
    "/health": {
      get: {
        summary: "Health check",
        responses: {
          "200": {
            description: "Service status",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    uptime: { type: "number" },
                    timestamp: { type: "string", format: "date-time" }
                  },
                  required: ["status", "uptime", "timestamp"]
                }
              }
            }
          }
        }
      }
    },
    "/v1/ping": {
      get: {
        summary: "Ping the API",
        responses: {
          "200": {
            description: "Pong response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    pong: { type: "boolean" }
                  },
                  required: ["pong"]
                }
              }
            }
          }
        }
      }
    }
  }
} as const;
