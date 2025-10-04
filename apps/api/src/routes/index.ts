import { ClerkExpressRequireAuth } from "@clerk/express";
import type { RequestWithAuth } from "@clerk/express";
import { Router } from "express";

import { healthRouter } from "./health.js";

export const router = Router();

router.use(healthRouter);

router.get("/v1/ping", ClerkExpressRequireAuth(), (req: RequestWithAuth, res) => {
  const { userId } = req.auth;
  res.json({ pong: true, userId });
});
