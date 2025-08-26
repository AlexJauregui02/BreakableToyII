export interface FlightSearch {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string | undefined;
    returnDate: string | undefined;
    adults: string;
    nonStop: boolean;
    currencyCode: String;
}