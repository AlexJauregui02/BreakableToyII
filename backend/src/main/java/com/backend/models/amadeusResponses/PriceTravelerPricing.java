package com.backend.models.amadeusResponses;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
class PriceTravelerPricing {
    private String currency;
    private String total;
    private String base;
    private List<Fee> fees;
    private List<Tax> taxes;
    private String refundableTaxes;

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getTotal() { return total; }
    public void setTotal(String total) { this.total = total; }

    public String getBase() { return base; }
    public void setBase(String base) { this.base = base; }

    public List<Fee> getFees() { return fees; }
    public void setFees(List<Fee> fees) { this.fees = fees; }

    public List<Tax> getTaxes() { return taxes; }
    public void setTaxes(List<Tax> taxes) { this.taxes = taxes; }

    public String getRefundableTaxes() { return refundableTaxes; }
    public void setRefundableTaxes(String refundableTaxes) { this.refundableTaxes = refundableTaxes; }
}
