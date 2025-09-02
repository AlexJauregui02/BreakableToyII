package com.backend.models.amadeusResponses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
class Amenity {
    private String description;
    private Boolean isChargeable;
    private String amenityType;
    private AmenityProvider amenityProvider;

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getIsChargeable() { return isChargeable; }
    public void setIsChargeable(Boolean isChargeable) { this.isChargeable = isChargeable; }

    public String getAmenityType() { return amenityType; }
    public void setAmenityType(String amenityType) { this.amenityType = amenityType; }

    public AmenityProvider getAmenityProvider() { return amenityProvider; }
    public void setAmenityProvider(AmenityProvider amenityProvider) { this.amenityProvider = amenityProvider; }
}
