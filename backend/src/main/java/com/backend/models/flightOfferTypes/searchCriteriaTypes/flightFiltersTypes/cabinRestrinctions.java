package com.backend.models.flightOfferTypes.searchCriteriaTypes.flightFiltersTypes;

public class cabinRestrinctions {

    public enum Cabin { 
        ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST
    }
    public enum Coverage {
        MOST_SEGMENTS, AT_LEAST_ONE_SEGMENT, ALL_SEGMENTS
    }

    private String[] originDestinationIds;
    private Cabin cabin;
    private Coverage coverage;
    
    // Getters and Setters
    public String[] getOriginDestinationIds() { return originDestinationIds; }
    public void setOriginDestinationIds(String[] originDestinationIds) { this.originDestinationIds = originDestinationIds; }

    public Cabin getCabin() { return cabin; }
    public void setCabin(Cabin cabin) { this.cabin = cabin; }

    public Coverage getCoverage() { return coverage; }
    public void setCoverage(Coverage coverage) { this.coverage = coverage; }
}
