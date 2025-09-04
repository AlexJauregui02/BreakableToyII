import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DetailCard } from "./detailCard";
import { fornmatToCompleteDate } from "@/lib/utils";
import type { travelerPricings } from "@/types/flightSearch";


vi.mock("@/lib/utils", async () => {
  const actual = await vi.importActual<typeof import("@/lib/utils")>("@/lib/utils");
  return {
    ...actual,
    iataCodeCitySearch: vi.fn().mockImplementation((code: string) => {
      return code === "MEX" ? "Mexico City" : "Unknown City";
    }),
  };
});

describe("DetailCard", () => {
    const traveler1 = {
        travelerId: "1",
        travelerType: "ADULT",
        fareOption: "STANDARD",
        fareDetailsBySegment: [
            {
                segmentId: "s1",
                cabin: "Economy",
                class: "Y",
                amenities: [{ description: "Extra legroom" }],
            },
        ],
    } as unknown as travelerPricings;
    
    const baseProps = {
        index: 0,
        itinerary: {
        segments: [
            {
            id: "s1",
            number: "123",
            carrierCode: "AA",
            aircraft: { code: "A320" },
            departure: { iataCode: "MEX", at: "2025-09-01T10:00:00" },
            arrival: { iataCode: "JFK", at: "2025-09-01T15:00:00" },
            },
        ],
        },
        aircraft: { A320: "Airbus A320" },
        carriers: { AA: "American Airlines" },
        travelerPricings: [traveler1],
    };

    it("Renders departure and arrival", () => {
        render(<DetailCard {...baseProps} />);

        expect(
        screen.getByText(`Departure: ${fornmatToCompleteDate("2025-09-01T10:00:00")}`)
        ).toBeInTheDocument();

        expect(
        screen.getByText(`Arrival: ${fornmatToCompleteDate("2025-09-01T15:00:00")}`)
        ).toBeInTheDocument();
    });

    it("Renders traveler pricing with fare details and amenities", () => {
        render(<DetailCard {...baseProps} />);

        expect(screen.getByText("Traveler 1")).toBeInTheDocument();
        expect(screen.getByText("Cabin: Economy")).toBeInTheDocument();
        expect(screen.getByText("Class: Y")).toBeInTheDocument();
        expect(screen.getByText("- Extra legroom")).toBeInTheDocument();
    });

});
