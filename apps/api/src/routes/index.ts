import { Router } from "express";

import { healthRouter } from "./health.js";

export const router = Router();

router.use(healthRouter);

router.get("/v1/ping", (_req, res) => {
  res.json({ pong: true });
});
