import { fetchApi } from "../client"
import type { FlightSearchOffer, FlightOffersResponse } from "@/types/flightSearch"


export async function getFlightOffers(data: FlightSearchOffer): Promise<FlightOffersResponse | undefined> {
    let url = `/flight-offers?originLocationCode=${data.originLocationCode}&destinationLocationCode=${data.destinationLocationCode}&departureDate=${data.departureDate}&adults=${data.adults}`;

    if (data.returnDate) { url += `&returnDate=${data.returnDate}`; }
    if (data.nonStop) { url += `&nonStop=true`; }
    if (data.currencyCode) { url += `&currencyCode=${data.currencyCode}`; }

    return fetchApi<FlightOffersResponse>(url);
}