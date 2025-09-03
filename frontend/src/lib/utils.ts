import { useFlightOffersResponse } from "@/context/FlightOffersContext";
import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
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

// Returns complete date format (ej.) 2025-09-04 11:45 am
export function fornmatToCompleteDate(date: string | undefined): string {
	if (!date) return "";
	return dayjs(date).format("YYYY-MM-DD HH:mm a");
};

// Gives the time between two dates
export function diffBetweenDate(date_1: string | undefined, date_2: string | undefined): string {
	const date1 = dayjs(date_1);
	const date2 = dayjs(date_2);
	const diffMinutes = date2.diff(date1, "minute");

	return `${Math.floor(diffMinutes / 60)} hrs & ${diffMinutes % 60} mins`;
};

// Returns the price with cents (ej.) 688.62
export function formatPrice(price: string | undefined): string {
		if (!price) return "";
		return Number(price).toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

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

export function iataCodeCitySearch(code: string | undefined): string | undefined {
	const { locationsName } = useFlightOffersResponse();

	if (!code) return "";
	const cityName = locationsName.find(([iataCode]) => iataCode === code);
	return cityName ? cityName[1] : undefined;
}
