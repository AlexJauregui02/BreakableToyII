package com.backend.models.amadeusResponses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
class Fee {
    private String amount;
    private FeeType type;

    public String getAmount() { return amount; }
    public void setAmount(String amount) { this.amount = amount; }

    public FeeType getType() { return type; }
    public void setType(FeeType type) { this.type = type; }
}
enum FeeType { TICKETING, FORM_OF_PAYMENT, SUPPLIER }