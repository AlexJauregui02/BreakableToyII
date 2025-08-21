package com.backend.models.flightOfferTypes.searchCriteriaTypes;

import com.backend.models.flightOfferTypes.searchCriteriaTypes.flightFiltersTypes.flightFilters;

public class searchCriteria {

    private Boolean excludeAllotments;
    private Boolean addOneWayOffers;
    private Integer maxFlightOffers;
    private Integer maxPrice;
    private Boolean allowAlternativeFareOptions;
    private Boolean oneFlightOfferPerDay;
    
    private additionalInformation additionalInformation;
    private pricingOptions pricingOptions;
    private flightFilters flightFilters;

    // Getters and Setters
    public Boolean getExcludeAllotments() { return excludeAllotments; }
    public void setExcludeAllotments(Boolean excludeAllotments) { this.excludeAllotments = excludeAllotments; } 

    public Boolean getAddOneWayOffers() { return addOneWayOffers; }
    public void setAddOneWayOffers(Boolean addOneWayOffers) { this.addOneWayOffers = addOneWayOffers; } 

    public Integer getMaxFlightOffers() { return maxFlightOffers; }
    public void setMaxFlightOffers(Integer maxFlightOffers) { this.maxFlightOffers = maxFlightOffers; } 

    public Integer getMaxPrice() { return maxPrice; }
    public void setMaxPrice(Integer maxPrice) { this.maxPrice = maxPrice; }

    public Boolean getAllowAlternativeFareOptions() { return allowAlternativeFareOptions; }
    public void setAllowAlternativeFareOptions(Boolean allowAlternativeFareOptions) { this.allowAlternativeFareOptions = allowAlternativeFareOptions; } 

    public Boolean getOneFlightOfferPerDay() { return oneFlightOfferPerDay; }
    public void setOneFlightOfferPerDay(Boolean oneFlightOfferPerDay) { this.oneFlightOfferPerDay = oneFlightOfferPerDay; } 

    public additionalInformation getAdditionalInformation() { return additionalInformation; }
    public void setAdditionalInformation(additionalInformation additionalInformation) { this.additionalInformation = additionalInformation; }   

    public pricingOptions getPricingOptions() { return pricingOptions; }
    public void setPricingOptions(pricingOptions pricingOptions) { this.pricingOptions = pricingOptions; }      

    public flightFilters getFlightFilters() { return flightFilters; }
    public void setFlightFilters(flightFilters flightFilters) { this.flightFilters = flightFilters; }
}
