package com.backend.models.amadeusResponses;

public class ChargeableCheckedBags {
    private Integer quantity;
    private Integer weight;
    private String weightUnit;
    private String id;

    // Getters and Setters
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Integer getWeight() { return weight; }
    public void setWeight(Integer weight) { this.weight = weight; }

    public String getWeightUnit() { return weightUnit; }
    public void setWeightUnit(String weightUnit) { this.weightUnit = weightUnit; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
}
