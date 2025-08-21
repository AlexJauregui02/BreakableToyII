package com.backend.models.flightOfferTypes.searchCriteriaTypes;

public class pricingOptions {
    
    private Boolean includedCheckedBagsOnly;
    private Boolean refundableFare;
    private Boolean noRestrictionFare;
    private Boolean noPenaltyFare;

    // Getters and Setters
    public Boolean getIncludedCheckedBagsOnly() { return includedCheckedBagsOnly; }
    public void setIncludedCheckedBagsOnly(Boolean includedCheckedBagsOnly) { this.includedCheckedBagsOnly = includedCheckedBagsOnly; }

    public Boolean getRefundableFare() { return refundableFare; }
    public void setRefundableFare(Boolean refundableFare) { this.refundableFare = refundableFare; }

    public Boolean getNoRestrictionFare() { return noRestrictionFare; }
    public void setNoRestrictionFare(Boolean noRestrictionFare) { this.noRestrictionFare = noRestrictionFare; }

    public Boolean getNoPenaltyFare() { return noPenaltyFare; }
    public void setNoPenaltyFare(Boolean noPenaltyFare) { this.noPenaltyFare = noPenaltyFare; }

}
