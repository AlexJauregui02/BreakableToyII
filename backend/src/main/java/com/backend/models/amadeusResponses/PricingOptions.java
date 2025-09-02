package com.backend.models.amadeusResponses;


import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
class PricingOptions {
    private List<PricingOptionsFareType> fareType;
    private Boolean includedCheckedBagsOnly;
    private Boolean refundableFare;
    private Boolean noRestrictionFare;

    @JsonAlias({"noPenaltyFare","noPenaltyfare"})
    private Boolean noPenaltyFare;

    public List<PricingOptionsFareType> getFareType() { return fareType; }
    public void setFareType(List<PricingOptionsFareType> fareType) { this.fareType = fareType; }

    public Boolean getIncludedCheckedBagsOnly() { return includedCheckedBagsOnly; }
    public void setIncludedCheckedBagsOnly(Boolean includedCheckedBagsOnly) { this.includedCheckedBagsOnly = includedCheckedBagsOnly; }

    public Boolean getRefundableFare() { return refundableFare; }
    public void setRefundableFare(Boolean refundableFare) { this.refundableFare = refundableFare; }

    public Boolean getNoRestrictionFare() { return noRestrictionFare; }
    public void setNoRestrictionFare(Boolean noRestrictionFare) { this.noRestrictionFare = noRestrictionFare; }

    public Boolean getNoPenaltyFare() { return noPenaltyFare; }
    public void setNoPenaltyFare(Boolean noPenaltyFare) { this.noPenaltyFare = noPenaltyFare; }
}
enum PricingOptionsFareType { PUBLISHED, NEGOTIATED, CORPORATE }
