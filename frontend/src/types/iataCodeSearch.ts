
export interface IataCodeAirlineSearchResponse {
    type: string;
    iataCode: string;
    icaoCode: string;
    businessName: string;
    commonName: string;
}

export interface IataCodeCitySearchResponse {
    type: string;
    subType: string;
    name: string;
    detailedName: string;
    id: string;
    iataCode: string;
}