package com.backend.models.flightOfferTypes.originDestinationTypes;

public class originDestinations {
    
    private String id;
    private String originLocationCode;
    private String destinationLocationCode;
    private departureTimeRange departureDatetimeRange;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getOriginLocationCode() { return originLocationCode; }
    public void setOriginLocationCode(String originLocationCode) { this.originLocationCode = originLocationCode; }

    public String getDestinationLocationCode() { return destinationLocationCode; }
    public void setDestinationLocationCode(String destinationLocationCode) { this.destinationLocationCode = destinationLocationCode; }

    public departureTimeRange getDepartureDatetimeRange() { return departureDatetimeRange; }
    public void setDepartureDatetimeRange(departureTimeRange departureDatetimeRange) { this.departureDatetimeRange = departureDatetimeRange; }
}