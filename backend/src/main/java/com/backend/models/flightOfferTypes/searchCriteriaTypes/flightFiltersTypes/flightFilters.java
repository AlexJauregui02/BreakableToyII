package com.backend.models.flightOfferTypes.searchCriteriaTypes.flightFiltersTypes;

import java.util.List;

public class flightFilters {
    
    private Boolean crossBorderAllowed;
    private Boolean moreOvernightAllowed;
    private Boolean returnToDepartureAirport;
    private Boolean railSegmentAllowed;
    private Boolean busSegmentAllowed;
    private Integer maxFlightTime;

    private carrierRestrictions carrierRestrictions;
    private List<cabinRestrinctions> cabinRestrictions;
    private connectionRestrictions connectionRestrictions;

    // Getters and Setters
    public Boolean getCrossBorderAllowed() { return crossBorderAllowed; }
    public void setCrossBorderAllowed(Boolean crossBorderAllowed) { this.crossBorderAllowed = crossBorderAllowed; }

    public Boolean getMoreOvernightAllowed() { return moreOvernightAllowed; }
    public void setMoreOvernightAllowed(Boolean moreOvernightAllowed) { this.moreOvernightAllowed = moreOvernightAllowed; }

    public Boolean getReturnToDepartureAirport() { return returnToDepartureAirport; }
    public void setReturnToDepartureAirport(Boolean returnToDepartureAirport) { this.returnToDepartureAirport = returnToDepartureAirport; }

    public Boolean getRailSegmentAllowed() { return railSegmentAllowed; }   
    public void setRailSegmentAllowed(Boolean railSegmentAllowed) { this.railSegmentAllowed = railSegmentAllowed; } 

    public Boolean getBusSegmentAllowed() { return busSegmentAllowed; }
    public void setBusSegmentAllowed(Boolean busSegmentAllowed) { this.busSegmentAllowed = busSegmentAllowed; } 

    public Integer getMaxFlightTime() { return maxFlightTime; }
    public void setMaxFlightTime(Integer maxFlightTime) { this.maxFlightTime = maxFlightTime; } 

    public carrierRestrictions getCarrierRestrictions() { return carrierRestrictions; }
    public void setCarrierRestrictions(carrierRestrictions carrierRestrictions) { this.carrierRestrictions = carrierRestrictions; } 

    public List<cabinRestrinctions> getCabinRestrictions() { return cabinRestrictions; }
    public void setCabinRestrictions(List<cabinRestrinctions> cabinRestrictions) { this.cabinRestrictions = cabinRestrictions; }    

    public connectionRestrictions getConnectionRestrictions() { return connectionRestrictions; }
    public void setConnectionRestrictions(connectionRestrictions connectionRestrictions) { this.connectionRestrictions = connectionRestrictions; }    
}
