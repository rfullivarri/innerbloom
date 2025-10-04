import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "./App";

describe("Landing page", () => {
  it("renders hero content and primary call to action", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: /Design, launch, and evolve/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Start building today/i })).toBeInTheDocument();
    expect(screen.getByText(/One platform for missions, rewards, and analytics/i)).toBeInTheDocument();
  });

  it("includes anchor navigation for key sections", () => {
    render(<App />);

    ["Product", "Platform", "Automation", "Contact"].forEach((label) => {
      expect(screen.queryAllByRole("link", { name: label }).length).toBeGreaterThan(0);
    });
  });
});
