package com.backend.models.amadeusResponses;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
class TravelerPricing {
    private String travelerId;
    private TravelerPricingFareOptions fareOption;
    private TravelerType travelerType;

    private String associatedAdultId;

    private PriceTravelerPricing price;

    private List<FareDetailsBySegment> fareDetailsBySegment;

    public String getTravelerId() { return travelerId; }
    public void setTravelerId(String travelerId) { this.travelerId = travelerId; }

    public TravelerPricingFareOptions getFareOption() { return fareOption; }
    public void setFareOption(TravelerPricingFareOptions fareOption) { this.fareOption = fareOption; }

    public TravelerType getTravelerType() { return travelerType; }
    public void setTravelerType(TravelerType travelerType) { this.travelerType = travelerType; }

    public String getAssociatedAdultId() { return associatedAdultId; }
    public void setAssociatedAdultId(String associatedAdultId) { this.associatedAdultId = associatedAdultId; }

    public PriceTravelerPricing getPrice() { return price; }
    public void setPrice(PriceTravelerPricing price) { this.price = price; }

    public List<FareDetailsBySegment> getFareDetailsBySegment() { return fareDetailsBySegment; }
    public void setFareDetailsBySegment(List<FareDetailsBySegment> fareDetailsBySegment) { this.fareDetailsBySegment = fareDetailsBySegment; }
}

enum TravelerPricingFareOptions {
    STANDARD, INCLUSIVE_TOUR, SPANISH_MELILLA_RESIDENT, SPANISH_CEUTA_RESIDENT, SPANISH_CANARY_RESIDENT,
    SPANISH_BALEARIC_RESIDENT, AIR_FRANCE_METROPOLITAN_DISCOUNT_PASS, AIR_FRANCE_DOM_DISCOUNT_PASS,
    AIR_FRANCE_COMBINED_DISCOUNT_PASS, AIR_FRANCE_FAMILY, ADULT_WITH_COMPANION, COMPANION
}

enum TravelerType { ADULT, CHILD, SENIOR, YOUNG, HELD_INFANT, SEATED_INFANT, STUDENT }

