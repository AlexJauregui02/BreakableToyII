package com.backend.models.amadeusResponses;

import java.util.List;

public class TravelerPricing {
    private String travelerId;
    private String fareOption;
    private String travelerType;
    private String associatedAdultId;
    private PriceTravelerPricing price;
    private List<FareDetailsBySegment> fareDetailsBySegment;

    // Getters and Setters
    public String getTravelerId() { return travelerId; }
    public void setTravelerId(String travelerId) { this.travelerId = travelerId; }

    public String getFareOption() { return fareOption; }
    public void setFareOption(String fareOption) { this.fareOption = fareOption; }

    public String getTravelerType() { return travelerType; }
    public void setTravelerType(String travelerType) { this.travelerType = travelerType; }

    public String getAssociatedAdultId() { return associatedAdultId; }
    public void setAssociatedAdultId(String associatedAdultId) { this.associatedAdultId = associatedAdultId; }

    public PriceTravelerPricing getPrice() { return price; }
    public void setPrice(PriceTravelerPricing price) { this.price = price; }

    public List<FareDetailsBySegment> getFareDetailsBySegment() { return fareDetailsBySegment; }
    public void setFareDetailsBySegment(List<FareDetailsBySegment> fareDetailsBySegment) { this.fareDetailsBySegment = fareDetailsBySegment; }
}
