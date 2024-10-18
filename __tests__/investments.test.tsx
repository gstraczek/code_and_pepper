import Investments from "@/app/components/investments/investments";
import useInvestmentsStore from "@/store/investmentsStore";
import { Investment } from "@prisma/client";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, describe, it, vi, beforeEach } from "vitest";

describe("Investments", () => {
  const mockInitialData: Investment[] = [
    {
      id: 1,
      name: "testStock",
      quantity: 0,
      buyPrice: 100,
      currentPrice: 150,
      userId: "user1",
    },
  ];

  it("renders the Investments component", () => {
    render(<Investments initialData={mockInitialData} />);
    expect(screen.getByText("Investments Table")).toBeDefined();
  });

  it("should add a new investment", () => {
    render(<Investments initialData={mockInitialData} />);
    const addInvestmentButton = screen.getAllByTestId("add-new-row")[0];
    fireEvent.click(addInvestmentButton);
    expect(addInvestmentButton.getAttribute("disabled")).toBeDefined();
  });
});
