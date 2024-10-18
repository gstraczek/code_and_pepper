import Dashboard from "@/app/page";
import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";

describe("Homepage", () => {
  it("should check content", () => {
    render(<Dashboard />);
    expect(screen.getByText("Investments")).toBeDefined();
    expect(screen.getByText("Aggregated Investments")).toBeDefined();
    expect(screen.getByText("Welcome to Investment Tracker")).toBeDefined();
  });
});
