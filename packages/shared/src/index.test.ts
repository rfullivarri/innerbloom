import { describe, expect, it } from "vitest";

import { isoTimestamp, toApiResult } from "./index";

describe("shared utils", () => {
  it("wraps data into api result", () => {
    expect(toApiResult({ hello: "world" })).toEqual({ data: { hello: "world" }, error: undefined });
  });

  it("creates a valid ISO timestamp", () => {
    const stamp = isoTimestamp();
    expect(() => new Date(stamp)).not.toThrow();
  });
});
