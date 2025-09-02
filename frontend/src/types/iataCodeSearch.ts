
export interface IataCodeAirlineSearchResponse {
    type: string;
    iataCode: string;
    icaoCode: string;
    businessName: string;
    commonName: string;
}

export interface IataCodeAirportSearchResponse {
    type: string;
    subType: string;
    name: string;
    detailedName: string;
    id: string;
    iataCode: string;
}