import { render, screen, fireEvent } from "@testing-library/react";
import { vi, type Mock } from "vitest";
import { SortControls } from "./sortControls";
import { useFlightOffersResponse } from "@/context/FlightOffersContext";


vi.mock("@/context/FlightOffersContext", () => ({
  useFlightOffersResponse: vi.fn(),
}));

vi.mock("@/api/services/flightSearchService", () => ({
  getFlightOffers: vi.fn(),
}));

describe("SortControls", () => {
  const mockSetResults = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useFlightOffersResponse as unknown as Mock).mockReturnValue({
      searchParams: { origin: "MEX", destination: "JFK" },
      setResults: mockSetResults,
    });
  });

  it("Renders Correctly", () => {
    render(<SortControls />);
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();
  });

  it("Changes order by clicking", () => {
    render(<SortControls />);
    fireEvent.click(screen.getByRole("button", { name: "↑" }));
    expect(screen.getByRole("button", { name: "↓" })).toBeInTheDocument();
  });
});
