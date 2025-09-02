package com.backend.models.flightOfferTypes.searchCriteriaTypes.flightFiltersTypes;

public class carrierRestrictions {
    
    private Boolean blacklistedInEUAllowed;
    private String[] excludedCarrierCodes;
    private String[] includedCarrierCodes; 

    // Getters and Setters
    public Boolean getBlacklistedInEUAllowed() { return blacklistedInEUAllowed; }
    public void setBlacklistedInEUAllowed(Boolean blacklistedInEUAllowed) { this.blacklistedInEUAllowed = blacklistedInEUAllowed; }

    public String[] getExcludedCarrierCodes() { return excludedCarrierCodes; }
    public void setExcludedCarrierCodes(String[] excludedCarrierCodes) { this.excludedCarrierCodes = excludedCarrierCodes; }

    public String[] getIncludedCarrierCodes() { return includedCarrierCodes; }
    public void setIncludedCarrierCodes(String[] includedCarrierCodes) { this.includedCarrierCodes = includedCarrierCodes; }
}
