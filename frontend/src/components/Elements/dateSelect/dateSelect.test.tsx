import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { DateSelect } from "./dateSelect";


describe("DateSelect", () => {
    const mockOnChange = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Renders with formatted date", () => {
        const testDate = new Date(2025, 8, 3);
        render(<DateSelect date={testDate} onChange={mockOnChange} />);

        expect(screen.getByPlaceholderText("New Date")).toHaveValue(
        "September 03, 2025" 
        );
    });

    it("Opens the calendar popover when clicking the button", () => {
        render(<DateSelect date={new Date()} onChange={mockOnChange} />);

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(screen.getByRole("grid")).toBeInTheDocument();
    });

    it("calls onChange when selecting a date", async () => {
        render(<DateSelect date={new Date()} onChange={mockOnChange} />);

        fireEvent.click(screen.getByRole("button"));

        const day = await screen.findByText("15");
        fireEvent.click(day);

        await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled();
        expect(mockOnChange.mock.calls[0][0]).toBeInstanceOf(Date);
        });
    });
})