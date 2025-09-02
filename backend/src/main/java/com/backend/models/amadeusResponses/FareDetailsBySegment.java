package com.backend.models.amadeusResponses;

import java.util.List;

public class FareDetailsBySegment {
    private String segmentId;
    private String cabin;
    private String fareBasis;
    private String brandedFare;
    private String flightClass;
    private Boolean isAllotment;
    private AllotmentDetails allotmentDetails;
    private String sliceDiceIndicator;
    private BaggageAllowance includedCheckedBags;
    private AdditionalServicesRequest additionalServices;
    private List<Amenity> amenities;

    // Getters and Setters
    public String getSegmentId() { return segmentId; }
    public void setSegmentId(String segmentId) { this.segmentId = segmentId; }

    public String getCabin() { return cabin; }
    public void setCabin(String cabin) { this.cabin = cabin; }

    public String getFareBasis() { return fareBasis; }
    public void setFareBasis(String fareBasis) { this.fareBasis = fareBasis; }

    public String getBrandedFare() { return brandedFare; }
    public void setBrandedFare(String brandedFare) { this.brandedFare = brandedFare; }

    public String getFlightClass() { return flightClass; }
    public void setFlightClass(String flightClass) { this.flightClass = flightClass; }

    public Boolean getIsAllotment() { return isAllotment; }
    public void setIsAllotment(Boolean isAllotment) { this.isAllotment = isAllotment; }

    public AllotmentDetails getAllotmentDetails() { return allotmentDetails; }
    public void setAllotmentDetails(AllotmentDetails allotmentDetails) { this.allotmentDetails = allotmentDetails; }

    public String getSliceDiceIndicator() { return sliceDiceIndicator; }
    public void setSliceDiceIndicator(String sliceDiceIndicator) { this.sliceDiceIndicator = sliceDiceIndicator; }

    public BaggageAllowance getIncludedCheckedBags() { return includedCheckedBags; }
    public void setIncludedCheckedBags(BaggageAllowance includedCheckedBags) { this.includedCheckedBags = includedCheckedBags; }

    public AdditionalServicesRequest getAdditionalServices() { return additionalServices; }
    public void setAdditionalServices(AdditionalServicesRequest additionalServices) { this.additionalServices = additionalServices; }

    public List<Amenity> getAmenities() { return amenities; }
    public void setAmenities(List<Amenity> amenities) { this.amenities = amenities; }
}
