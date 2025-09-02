package com.backend.models.amadeusResponses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
class Tax {
    private String amount;
    private String code;

    public String getAmount() { return amount; }
    public void setAmount(String amount) { this.amount = amount; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
}
