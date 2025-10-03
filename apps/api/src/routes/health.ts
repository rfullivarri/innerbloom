import { Router } from "express";

import { isoTimestamp } from "@innerbloom/shared";

export const healthRouter = Router();

healthRouter.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: isoTimestamp()
  });
});
