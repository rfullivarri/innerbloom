import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

import { MemoryRouter } from "react-router-dom";

import App from "./App";

describe("App navigation", () => {
  it("renders all primary links", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Database/i)).toBeInTheDocument();
    expect(screen.getByText(/Missions/i)).toBeInTheDocument();
    expect(screen.getByText(/Rewards/i)).toBeInTheDocument();
  });
});
