package com.backend.models.amadeusResponses;

public class Price {
    private String grandTotal;
    private String total;
    private String currency;

    // Getters and Setters
    public String getGrandTotal() { return grandTotal; }
    public void setGrandTotal(String grandTotal) { this.grandTotal = grandTotal; }

    public String getTotal() { return total; }
    public void setTotal(String total) { this.total = total; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
}