import { fetchApi } from "../client"
import type { apiResponse } from "@/types/apiResponse";
import type { flightOfferResponse, FlightSearchOffer } from "@/types/flightSearch"
import type { IataCodeCitySearchResponse } from "@/types/iataCodeSearch";


export async function getFlightOffers(data: FlightSearchOffer): Promise<apiResponse<flightOfferResponse> | undefined> {
    let url = `/flight-offers?originLocationCode=${data.originLocationCode}&destinationLocationCode=${data.destinationLocationCode}&departureDate=${data.departureDate}&adults=${data.adults}`;

    if (data.returnDate) { url += `&returnDate=${data.returnDate}`; }
    if (data.nonStop) { url += `&nonStop=true`; }
    if (data.currencyCode) { url += `&currencyCode=${data.currencyCode}`; }

    return fetchApi<apiResponse<flightOfferResponse>>(url);
}

export async function getCityNameFromIataCode(iataCode: string): Promise<apiResponse<IataCodeCitySearchResponse> | undefined> {

    let url = `/airport-and-cities-search?subType=CITY&keyword=${iataCode}`;

    return fetchApi<apiResponse<IataCodeCitySearchResponse>>(url);
}