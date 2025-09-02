import { fetchApi } from "../client"
import type { apiResponse } from "@/types/apiResponse";
import type { flightOfferResponse, FlightSearchOffer } from "@/types/flightSearch"
import type { IataCodeAirlineSearchResponse, IataCodeAirportSearchResponse } from "@/types/iataCodeSearch";


export async function getFlightOffers(data: FlightSearchOffer): Promise<apiResponse<flightOfferResponse> | undefined> {
    let url = `/flight-offers?originLocationCode=${data.originLocationCode}&destinationLocationCode=${data.destinationLocationCode}&departureDate=${data.departureDate}&adults=${data.adults}&max=10`;

    if (data.returnDate) { url += `&returnDate=${data.returnDate}`; }
    if (data.nonStop) { url += `&nonStop=true`; }
    if (data.currencyCode) { url += `&currencyCode=${data.currencyCode}`; }
    if (data.sortBy) { url += `&sortBy=${data.sortBy}`; }
    if (data.sortOrder) { url += `&sortOrder=${data.sortOrder}`; }

    return fetchApi<apiResponse<flightOfferResponse>>(url);
}

export async function getCityNameFromIataCode(iataCode: string, countryCode: string): Promise<apiResponse<IataCodeAirportSearchResponse> | undefined> {

    let url = `/airport-and-cities-search?subType=AIRPORT&keyword=${iataCode}&countryCode=${countryCode}`;

    return fetchApi<apiResponse<IataCodeAirportSearchResponse>>(url);
}

export async function getAirlineNameFromIataCode(iataCode: string): Promise<apiResponse<IataCodeAirlineSearchResponse> | undefined> {

    let url = `/airline-information?airlineCode=${iataCode}`;

    return fetchApi<apiResponse<IataCodeAirlineSearchResponse>>(url);
}

export async function searchAirportsByKeyword(keyword: string): Promise<IataCodeAirportSearchResponse[]> {
  if (!keyword) return [];

  const url = `/airport-and-cities-search?subType=AIRPORT&keyword=${encodeURIComponent(keyword)}`;
  const res = await fetchApi<apiResponse<IataCodeAirportSearchResponse>>(url);

  return res?.data ?? [];
}