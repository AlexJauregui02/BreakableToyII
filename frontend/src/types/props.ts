import type { itinerariesFlightOffers, travelerPricings } from "./flightSearch";
import type { SelectOption } from "./option";

export interface AirportAutoCompleProps {
	onChange: (option: SelectOption | null) => void;
	defaultValue?: SelectOption;
}

export interface selectDateProps {
	date: Date | undefined;
	onChange: (newDate: Date | undefined) => void;
}

export interface detailCardProps {
	index: number;
	itinerary: itinerariesFlightOffers;
	travelerPricings: travelerPricings[] | undefined;
	aircraft?: {
		[code: string]: string;
	};
	carriers?: {
		[code: string]: string;
	};
}