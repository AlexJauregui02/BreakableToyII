package com.backend.models.amadeusResponses;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
class AdditionalServicesRequest {
    private ChargeableCheckedBags chargeableCheckedBags;
    private ChargeableSeat chargeableSeat;
    private String chargeableSeatNumber;
    private List<ServiceName> otherServices;

    public ChargeableCheckedBags getChargeableCheckedBags() { return chargeableCheckedBags; }
    public void setChargeableCheckedBags(ChargeableCheckedBags chargeableCheckedBags) { this.chargeableCheckedBags = chargeableCheckedBags; }

    public ChargeableSeat getChargeableSeat() { return chargeableSeat; }
    public void setChargeableSeat(ChargeableSeat chargeableSeat) { this.chargeableSeat = chargeableSeat; }

    public String getChargeableSeatNumber() { return chargeableSeatNumber; }
    public void setChargeableSeatNumber(String chargeableSeatNumber) { this.chargeableSeatNumber = chargeableSeatNumber; }

    public List<ServiceName> getOtherServices() { return otherServices; }
    public void setOtherServices(List<ServiceName> otherServices) { this.otherServices = otherServices; }
}