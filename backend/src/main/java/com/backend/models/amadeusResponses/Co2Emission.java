package com.backend.models.amadeusResponses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
class CO2Emission {
    private Integer weight;
    private String weightUnit;
    private TravelClass cabin;

    public Integer getWeight() { return weight; }
    public void setWeight(Integer weight) { this.weight = weight; }

    public String getWeightUnit() { return weightUnit; }
    public void setWeightUnit(String weightUnit) { this.weightUnit = weightUnit; }

    public TravelClass getCabin() { return cabin; }
    public void setCabin(TravelClass cabin) { this.cabin = cabin; }
}
