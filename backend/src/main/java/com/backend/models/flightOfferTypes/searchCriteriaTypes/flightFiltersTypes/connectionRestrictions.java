package com.backend.models.flightOfferTypes.searchCriteriaTypes.flightFiltersTypes;

public class connectionRestrictions {
    
    private Integer maxNumberOfConnections;
    private Boolean nonStopPreferred;
    private Boolean airportChangeAllowed;
    private Boolean technicalStopsAllowed;

    // Getters and Setters
    public Integer getMaxNumberOfConnections() { return maxNumberOfConnections; }
    public void setMaxNumberOfConnections(Integer maxNumberOfConnections) { this.maxNumberOfConnections = maxNumberOfConnections; }

    public Boolean getNonStopPreferred() { return nonStopPreferred; }
    public void setNonStopPreferred(Boolean nonStopPreferred) { this.nonStopPreferred = nonStopPreferred; } 

    public Boolean getAirportChangeAllowed() { return airportChangeAllowed; }
    public void setAirportChangeAllowed(Boolean airportChangeAllowed) { this.airportChangeAllowed = airportChangeAllowed; } 

    public Boolean getTechnicalStopsAllowed() { return technicalStopsAllowed; }
    public void setTechnicalStopsAllowed(Boolean technicalStopsAllowed) { this.technicalStopsAllowed = technicalStopsAllowed; }
}
