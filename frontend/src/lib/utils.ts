import { useFlightOffersResponse } from "@/context/FlightOffersContext";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | undefined): string {
    if (!date) return '';
    let formattedDate = new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).toLowerCase();

    formattedDate = formattedDate.replace(' ','');

    return formattedDate;
}

export function formatDuration(duration: string | undefined): string {

    if (!duration) return '';

    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return duration;

    const hours = match[1] ? `${match[1]}h` : '';
    const minutes = match[2] ? `${match[2]}m` : '';

    return [hours, minutes].filter(Boolean).join(' ');
}

export function handleLocalSearchCityName(code: string | undefined): string | undefined {
    const { locationsName } = useFlightOffersResponse();

    if (!code) return '';
    const cityName = locationsName.find(([iataCode]) => iataCode === code);
    return cityName ? cityName[1] : undefined;
}