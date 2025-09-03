import { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import type { apiResponse } from "@/types/apiResponse";
import type { flightOfferResponse, FlightSearchOffer, LocationsName } from "@/types/flightSearch";
import type { SelectOption } from "@/types/option";

import { Button } from "@/components/UI/button/button";
import { Card } from "@/components/UI/card/card";
import { getCityNameFromIataCode, getFlightOffers } from "@/api/services/flightSearchService";
import { useFlightOffersResponse } from "@/context/FlightOffersContext";
import { AirportAutocomplete } from "@/components/Elements/airportAutoComplete/airportAutoComplete";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { DateSelect } from "@/components/Elements/dateSelect/dateSelect";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);


export default function SearchPage() {
	const { setResults, setLocationsName, setSearchParams } = useFlightOffersResponse();
	const navigate = useNavigate();

	const currencyCodeOptions: SelectOption[] = [
		{ label: "Select...", value: "" },
		{ label: "USD", value: "USD" },
		{ label: "MXN", value: "MXN" },
	];

	const [loading, setLoading] = useState(false);

	const [originLocationCode, setOriginLocationCode] = useState<string>("");

	const [destinationLocationCode, setDestinationLocationCode] = useState<string>("");

	const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
	const handleDepartureDate = (date: Date | undefined) => {
		const departureDate = dayjs(date);
		if (!departureDate.isSameOrBefore(new Date(), "day")) {
			setDepartureDate(date);
		}

		if (departureDate.isSameOrAfter(returnDate, "day")) {
			setReturnDate(undefined);
		}
	};

	const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
	const handleReturnDate = (date: Date | undefined) => {
		const returnDate = dayjs(date);
		if (!returnDate.isSameOrBefore(departureDate, "day")) {
			setReturnDate(date);
		}
	};

	const [adults, setAdults] = useState<string>("");
	const handleAdults = (options: React.ChangeEvent<HTMLInputElement>) => {
		setAdults(options.target.value);
	};

	const [currencyCode, setCurrencyCode] = useState<String>("");
	const handleCurrencyCode = (options: SelectOption | null) => {
		if (options) setCurrencyCode(options?.value);
		else setCurrencyCode("");
	};

	const [isNonStop, setIsNonStop] = useState<boolean>(false);
	const handleIsNonStop = (options: React.ChangeEvent<HTMLInputElement>) => {
		setIsNonStop(options.target.checked);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setLoading(true);

		const flightSearchOffer: FlightSearchOffer = {
			originLocationCode: originLocationCode,
			destinationLocationCode: destinationLocationCode,
			departureDate: departureDate?.toISOString().split("T")[0],
			returnDate: returnDate?.toISOString().split("T")[0],
			adults: adults,
			nonStop: isNonStop,
			currencyCode: currencyCode,
		};

		if (!originLocationCode || !destinationLocationCode || !departureDate || !adults) {
			alert("Missing Field");
			setLoading(false);
			return;
		}

		try {
			const flightOffers = (await getFlightOffers(
				flightSearchOffer
			)) as apiResponse<flightOfferResponse>;

			if (flightOffers !== undefined) {
				setResults(flightOffers);

				const locations = Object.entries(flightOffers.dictionaries?.locations || {});

				const namedLocations: LocationsName = await Promise.all(
					locations.map(async ([iataCode, location]) => {
						try {
							const resNamedLocations = await getCityNameFromIataCode(
								iataCode,
								location.countryCode ?? ""
							);
							const cityName = resNamedLocations?.data?.[0]?.name ?? "";
							return [iataCode, cityName];
						} catch (error) {
							console.error(`Error obtaining city name from ${iataCode}:`, error);
							return [iataCode, "Unkown"];
						}
					})
				);
				setLocationsName(namedLocations);
				setSearchParams(flightSearchOffer);

				navigate("/results");
			}
		} catch (error) {
			console.log("Error: ", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center h-full w-full">
			<Card className="w-1/2 flex items-center h-fit">
				<form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
					<div className="font-semibold mb-3">FLIGHT SEARCH</div>

					<div className="flex flex-col w-full gap-y-3 mb-4">
						<div className="flex w-full gap-5 grid grid-cols-1 lg:grid-cols-2">
							<label className="font-medium w-full">
								Departure Airport:
								<AirportAutocomplete
									onChange={(option) => setOriginLocationCode(option?.value || "")}
								/>
							</label>

							<label className="font-medium w-full">
								Arrival Airport:
								<AirportAutocomplete
									onChange={(option) => setDestinationLocationCode(option?.value || "")}
								/>
							</label>
						</div>

						<div className="flex flex w-full gap-5 grid grid-cols-1 lg:grid-cols-2">
							<div className="flex flex-col">
								<label className="font-medium mb-1">Departure Date:</label>
								<DateSelect date={departureDate} onChange={handleDepartureDate}/>
							</div>

							<div className="flex flex-col">
								<label className="font-medium mb-1">Return Date (optional):</label>
								<DateSelect date={returnDate} onChange={handleReturnDate}/>
							</div>
						</div>

						<div className="flex w-full gap-10 grid grid-cols-1 lg:grid-cols-3">
							<div className="flex flex-col">
								<label className="font-medium mb-1">Adults:</label>
								<input
									id="adults"
									type="number"
									value={Number(adults)}
									onChange={handleAdults}
									className="h-8 w-full rounded-sm border border-gray-400 px-3 py-1 text-sm shadow-sm"
									min={0}
									max={999}
								/>
							</div>

							<label className="font-medium">
								Currency (optional):
								<Select
									id="currencyCode"
									options={currencyCodeOptions}
									onChange={handleCurrencyCode}
									unstyled
									classNames={{
										control: () =>
											"mt-1 px-2 rounded-sm border-1 border-gray-400 text-sm shadow-sm",
										option: () => "bg-white rounded-sm pl-2 py-1",
										menu: () => "bg-white border-1 border-gray-400 rounded-sm",
									}}
								/>
							</label>

							<div className="flex items-center">
								<input type="checkbox" checked={isNonStop} onChange={handleIsNonStop} />
								<label className="font-medium ml-2 flex items-center">Non-Stop</label>
							</div>
						</div>
					</div>

					<Button type="submit" className="w-3/4" disabled={loading}>
						Search
					</Button>
				</form>
			</Card>
		</div>
	);
}
