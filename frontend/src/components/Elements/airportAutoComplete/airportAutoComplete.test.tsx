import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, type Mock } from "vitest";
import { AirportAutocomplete } from "./airportAutoComplete";
import { searchAirportsByKeyword } from "@/api/services/flightSearchService";

vi.mock("@/api/services/flightSearchService", () => ({
  searchAirportsByKeyword: vi.fn(),
}));

describe("AirportAutocomplete", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Renders the input correctly", () => {
    render(<AirportAutocomplete onChange={mockOnChange} />);

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "" } });

    expect(screen.getByText("Search airport...")).toBeInTheDocument();
  });

  it("Load and shows options while writing", async () => {
    (searchAirportsByKeyword as Mock).mockResolvedValue([
      { name: "Mexico City Airport", iataCode: "MEX" },
      { name: "John F. Kennedy Intl", iataCode: "JFK" },
    ]);

    render(<AirportAutocomplete onChange={mockOnChange} />);

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "Me" } });

    await waitFor(() => {
      expect(screen.getByText("Mexico City Airport (MEX)")).toBeInTheDocument();
      expect(screen.getByText("John F. Kennedy Intl (JFK)")).toBeInTheDocument();
    });
  });

  it("Calls for onChange method when selecting an option", async () => {
    (searchAirportsByKeyword as Mock).mockResolvedValue([
      { name: "Mexico City Airport", iataCode: "MEX" },
    ]);

    render(<AirportAutocomplete onChange={mockOnChange} />);

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "Me" } });

    await waitFor(() => {
      expect(screen.getByText("Mexico City Airport (MEX)")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Mexico City Airport (MEX)"));

    expect(mockOnChange).toHaveBeenCalled();
  });
});
