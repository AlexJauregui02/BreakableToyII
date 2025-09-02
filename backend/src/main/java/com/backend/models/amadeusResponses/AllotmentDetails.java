package com.backend.models.amadeusResponses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
class AllotmentDetails {
    private String tourName;
    private String tourReference;

    public String getTourName() { return tourName; }
    public void setTourName(String tourName) { this.tourName = tourName; }

    public String getTourReference() { return tourReference; }
    public void setTourReference(String tourReference) { this.tourReference = tourReference; }
}
