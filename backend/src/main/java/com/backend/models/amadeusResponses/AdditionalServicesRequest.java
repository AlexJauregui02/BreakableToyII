package com.backend.models.amadeusResponses;

import java.util.List;

public class AdditionalServicesRequest {
    private ChargeableCheckedBags chargeableCheckedBags;
    private ChargeableSeat chargeableSeat;
    private String chargeableSeatNumber;
    private List<String> otherServices;

    // Getters and Setters
    public ChargeableCheckedBags getChargeableCheckedBags() { return chargeableCheckedBags; }
    public void setChargeableCheckedBags(ChargeableCheckedBags chargeableCheckedBags) { this.chargeableCheckedBags = chargeableCheckedBags; }

    public ChargeableSeat getChargeableSeat() { return chargeableSeat; }
    public void setChargeableSeat(ChargeableSeat chargeableSeat) { this.chargeableSeat = chargeableSeat; }

    public String getChargeableSeatNumber() { return chargeableSeatNumber; }
    public void setChargeableSeatNumber(String chargeableSeatNumber) { this.chargeableSeatNumber = chargeableSeatNumber; }

    public List<String> getOtherServices() { return otherServices; }
    public void setOtherServices(List<String> otherServices) { this.otherServices = otherServices; }
}