import type { apiResponse } from "./apiResponse";

export interface FlightSearchOffer {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string | undefined;
    returnDate: string | undefined;
    adults: string;
    nonStop: boolean;
    currencyCode: String;
}

export type FlightOffersContextType = {
    results: apiResponse<flightOfferResponse> | null
    setResults: (data: apiResponse<flightOfferResponse>) => void
    clearResults: () => void
}


export interface flightOfferResponse {
    type: string;
    id: string;
    source?: string;
    instantTicketingRequired?: boolean;
    disablePricing?: boolean;
    nonHomogeneous?: boolean;
    oneWay?: boolean;
    paymentCardRequired?: boolean;
    lastTicketingDate?: string;
    lastTicketingDateTime?: string;
    numberOfBookableSeats?: number;
    itineraries?: itinerariesFlightOffers[];
    price?: price;
    pricingOptions?: pricingOptions;
    validatingAirlineCodes?: string[];
    travelerPricings?: travelerPricings[];
}

interface itinerariesFlightOffers {
    duration?: string;
    segments: Segment[];
}

interface Segment {
    id?: string;
    numberOfStops?: number;
    blacklistedInEU?: boolean;
    co2Emissions?: co2Emission[];
    departure?: flightEndPoint;
    arrival?: flightEndPoint;
    carrierCode?: string;
    number?: string;
    aircraft?: aircraftEquipment;
    operating?: operatingFlight;
    duration?: string;
    stops?: flightStop[];
}

interface co2Emission {
    weight?: number;
    weightUnit?: string;
    cabin?: travelClass;
}

type travelClass = 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';

interface flightEndPoint {
    iataCode?: string;
    terminal?: string;
    at?: string;
}

interface aircraftEquipment {
    code?: string;
}

interface operatingFlight {
    carrierCode?: string;
}

interface flightStop {
    iataCode?: string;
    duration?: string;
    arrivalAt?: string;
    departureAt?: string;
}

interface price {
    margin?: string;
    grandTotal?: string;
    billingCurrency?: string;
    additionalServices?: additionalServices[];
    currency?: string;
    total?: string;
    base?: string;
    fees?: fee[];
    taxes?: tax[];
    refundableTaxes?: string;
}

interface additionalServices {
    amount?: string;
    type?: 'CHECKED_BAGS' | 'MEALS' | 'SEATS' | 'OTHER_SERVICES';
}

interface fee {
    amount?: string;
    type?: 'TICKETING' | 'FORM_OF_PAYMENT' | 'SUPPLIER';
}

interface tax {
    amount?: string;
    code?: string;
}

interface pricingOptions {
    fareType?: pricingOptionsFareType[];
    includedCheckedBagsOnly?: boolean;
    refundableFare?: boolean;
    noRestrictionFare?: boolean;
    noPenaltyfare?: boolean;
}

type pricingOptionsFareType = 'PUBLISHED' | 'NEGOTIATED' | 'CORPORATE';

interface travelerPricings {
    travelerId: string;
    fareOption: travelerPricingFareOptions;
    travelerType: travelerType;
    associatedAdultId?: string;
    price?: priceTravelerPricing;
    fareDetailsBySegment: fareDetailsBySegment[];
}

type travelerPricingFareOptions = 'STANDARD' | 'INCLUSIVE_TOUR' | 'SPANISH_MELILLA_RESIDENT' | 'SPANISH_CEUTA_RESIDENT' | 'SPANISH_CANARY_RESIDENT' | 'SPANISH_BALEARIC_RESIDENT' | 'AIR_FRANCE_METROPOLITAN_DISCOUNT_PASS' | 'AIR_FRANCE_DOM_DISCOUNT_PASS' | 'AIR_FRANCE_COMBINED_DISCOUNT_PASS' | 'AIR_FRANCE_FAMILY' | 'ADULT_WITH_COMPANION' | 'COMPANION';

type travelerType = 'ADULT' | 'CHILD' | 'SENIOR' | 'YOUNG' | 'HELD_INFANT' | 'SEATED_INFANT' | 'STUDENT';

interface priceTravelerPricing {
    currency?: string;
    total?: string;
    base?: string;
    fees?: fee[];
    taxes?: tax[];
    refundableTaxes?: string;
}

interface fareDetailsBySegment {
    segmentId: string;
    cabin?: travelClass;
    fareBasis?: string;
    brandedFare?: string;
    class?: string;
    isAllotment?: boolean;
    allotmentDetails?: allotmentDetails;
    sliceDiceIndicator?: sliceDiceIndicator;
    includedCheckedBags?: baggageAllowance;
    additionalServices?: additionalServicesRequest;
    amenities?: amenities[];
}

interface allotmentDetails {
    tourName?: string;
    tourReference?: string;
}

type sliceDiceIndicator = 'LOCAL_AVAILABILITY' | 'SUB_OD_AVAILABILITY_1' | 'SUB_OD_AVAILABILITY_2';

interface baggageAllowance {
    quantity?: number;
    weight?: number;
    weightUnit?: string;
}

interface additionalServicesRequest {
    chargeableCheckedBags?: chargeableCheckedBags;
    chargeableSeat?: chargeableSeat;
    chargeableSeatNumber?: string;
    otherServices?: serviceName[];
}

interface chargeableCheckedBags {
    quantity?: number;
    weight?: number;
    weightUnit?: string;
    id?: string;
}

interface chargeableSeat {
    id?: string;
    number?: string;
}

type serviceName = 'PRIORITY_BOARDING' | 'AIRPORT_CHECKIN';

interface amenities {
    description?: string;
    isChargeable?: boolean;
    amenityType?: string;
    amenityProvider?: amenityProvider;
}

interface amenityProvider {
    name?: string;
}