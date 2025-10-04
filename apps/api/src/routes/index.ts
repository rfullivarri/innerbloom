import { requireAuth } from "@clerk/express";
import type { RequireAuthProp } from "@clerk/express";
import { Router, type Request } from "express";

import { healthRouter } from "./health.js";

export const router = Router();

router.use(healthRouter);

router.get("/v1/ping", requireAuth(), (req, res) => {
  const { userId } = (req as Request & RequireAuthProp).auth;
  res.json({ pong: true, userId });
});
