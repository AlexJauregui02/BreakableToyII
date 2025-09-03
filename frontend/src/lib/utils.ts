import { useFlightOffersResponse } from "@/context/FlightOffersContext";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Returns local time (ej.) 3:45pm
export function formaDateToHrMin(date: string | undefined): string {

	if (!date) return "";
	let formattedDate = new Date(date)
		.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		})
		.toLowerCase();

	formattedDate = formattedDate.replace(" ", "");

	return formattedDate;
}

// Returns to long date (ej.) September 03, 2025 
export function formatToLongDate(date: Date | undefined | null) {
	if (!date) {
		return "";
	}

	return date.toLocaleDateString("en-US", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
}

export function formatDuration(duration: string | undefined): string {

	if (!duration) return "";

	const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
	if (!match) return duration;

	const hours = match[1] ? `${match[1]}h` : "";
	const minutes = match[2] ? `${match[2]}m` : "";

	return [hours, minutes].filter(Boolean).join(" ");
}

export function handleNumberstops(numberStops: number | undefined): string {
	let numberOfStops;
	if (numberStops == 0) {
		numberOfStops = "Nonstop";
	} else if (numberStops == 1) {
		numberOfStops = "1 Stop";
	} else {
		numberOfStops = numberOfStops + "Stops";
	}

	return numberOfStops;
}

export function handleLocalSearchCityName(code: string | undefined): string | undefined {
	const { locationsName } = useFlightOffersResponse();

	if (!code) return "";
	const cityName = locationsName.find(([iataCode]) => iataCode === code);
	return cityName ? cityName[1] : undefined;
}
