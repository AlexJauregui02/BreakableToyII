package com.backend.models.amadeusResponses;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
class FareDetailsBySegment {
    private String segmentId;
    private TravelClass cabin;
    private String fareBasis;
    private String brandedFare;

    private String brandedFareLabel;

    @JsonProperty("class")
    private String bookingClass;

    private Boolean isAllotment;
    private AllotmentDetails allotmentDetails;
    private SliceDiceIndicator sliceDiceIndicator;

    private BaggageAllowance includedCheckedBags;

    private AdditionalServicesRequest additionalServices;

    private List<Amenity> amenities;

    private IncludedCabinBags includedCabinBags;

    public String getSegmentId() { return segmentId; }
    public void setSegmentId(String segmentId) { this.segmentId = segmentId; }

    public TravelClass getCabin() { return cabin; }
    public void setCabin(TravelClass cabin) { this.cabin = cabin; }

    public String getFareBasis() { return fareBasis; }
    public void setFareBasis(String fareBasis) { this.fareBasis = fareBasis; }

    public String getBrandedFare() { return brandedFare; }
    public void setBrandedFare(String brandedFare) { this.brandedFare = brandedFare; }

    public String getBrandedFareLabel() { return brandedFareLabel; }
    public void setBrandedFareLabel(String brandedFareLabel) { this.brandedFareLabel = brandedFareLabel; }

    public String getBookingClass() { return bookingClass; }
    public void setBookingClass(String bookingClass) { this.bookingClass = bookingClass; }

    public Boolean getAllotment() { return isAllotment; }
    public void setAllotment(Boolean allotment) { isAllotment = allotment; }

    public AllotmentDetails getAllotmentDetails() { return allotmentDetails; }
    public void setAllotmentDetails(AllotmentDetails allotmentDetails) { this.allotmentDetails = allotmentDetails; }

    public SliceDiceIndicator getSliceDiceIndicator() { return sliceDiceIndicator; }
    public void setSliceDiceIndicator(SliceDiceIndicator sliceDiceIndicator) { this.sliceDiceIndicator = sliceDiceIndicator; }

    public BaggageAllowance getIncludedCheckedBags() { return includedCheckedBags; }
    public void setIncludedCheckedBags(BaggageAllowance includedCheckedBags) { this.includedCheckedBags = includedCheckedBags; }

    public AdditionalServicesRequest getAdditionalServices() { return additionalServices; }
    public void setAdditionalServices(AdditionalServicesRequest additionalServices) { this.additionalServices = additionalServices; }

    public List<Amenity> getAmenities() { return amenities; }
    public void setAmenities(List<Amenity> amenities) { this.amenities = amenities; }

    public IncludedCabinBags getIncludedCabinBags() { return includedCabinBags; }
    public void setIncludedCabinBags(IncludedCabinBags includedCabinBags) { this.includedCabinBags = includedCabinBags; }
}

enum SliceDiceIndicator { LOCAL_AVAILABILITY, SUB_OD_AVAILABILITY_1, SUB_OD_AVAILABILITY_2 }
enum TravelClass { ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST }