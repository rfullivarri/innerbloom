import type { ErrorRequestHandler, RequestHandler } from "express";

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "Not found" });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = err.status ?? 500;
  const message = err.message ?? "Something went wrong";

  if (process.env.NODE_ENV !== "test") {
    // console.error keeps the stack for debugging without crashing the process
    console.error(err);
  }

  res.status(status).json({ error: message });
};
