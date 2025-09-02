package com.backend.models.amadeusResponses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
class AdditionalService {
    private String amount;
    private AdditionalServiceType type;

    public String getAmount() { return amount; }
    public void setAmount(String amount) { this.amount = amount; }

    public AdditionalServiceType getType() { return type; }
    public void setType(AdditionalServiceType type) { this.type = type; }
}
enum AdditionalServiceType { CHECKED_BAGS, MEALS, SEATS, OTHER_SERVICES }

