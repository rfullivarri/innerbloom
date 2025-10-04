// Minimal type stubs for @clerk/express to satisfy the compiler when the
// package is not available in the offline CI environment.
declare module "@clerk/express" {
  import type { RequestHandler } from "express";

  export interface AuthObject {
    userId: string | null;
  }

  export interface RequireAuthProp {
    auth: AuthObject;
  }

  export function clerkMiddleware(): RequestHandler;
  export function requireAuth(): RequestHandler;
}
