package com.backend.models.flightOfferTypes;

import java.util.List;

import com.backend.models.flightOfferTypes.originDestinationTypes.originDestinations;
import com.backend.models.flightOfferTypes.searchCriteriaTypes.searchCriteria;
import com.backend.models.flightOfferTypes.travelersTypes.travelers;

public class flightOfferBodyResponse {
    
    private String CurretcyCode;
    private List<originDestinations> originDestinations;
    private List<travelers> travelers;
    private String[] sources;
    private searchCriteria searchCriteria;

    // Getters and Setters
    public String getCurretcyCode() { return CurretcyCode; }
    public void setCurretcyCode(String curretcyCode) { this.CurretcyCode = curretcyCode; }

    public List<originDestinations> getOriginDestinations() { return originDestinations; }
    public void setOriginDestinations(List<originDestinations>  originDestinations) { this.originDestinations = originDestinations; }

    public List<travelers> getTravelers() { return travelers; }
    public void setTravelers(List<travelers> travelers) { this.travelers = travelers; }

    public String[] getSources() { return sources; }
    public void setSources(String[] sources) { this.sources = sources; }

    public searchCriteria getSearchCriteria() { return searchCriteria; }
    public void setSearchCriteria(searchCriteria searchCriteria) { this.searchCriteria = searchCriteria; }

}
