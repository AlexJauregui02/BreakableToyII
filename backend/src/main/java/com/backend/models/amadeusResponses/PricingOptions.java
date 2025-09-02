package com.backend.models.amadeusResponses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PricingOptions {
    private List<String> fareType;
    private boolean includedCheckedBagsOnly;

    public List<String> getFareType() { return fareType; }
    public void setFareType(List<String> fareType) { this.fareType = fareType; }

    public boolean isIncludedCheckedBagsOnly() { return includedCheckedBagsOnly; }
    public void setIncludedCheckedBagsOnly(boolean includedCheckedBagsOnly) {
        this.includedCheckedBagsOnly = includedCheckedBagsOnly;
    }
}

