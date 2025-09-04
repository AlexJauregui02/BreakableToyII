package com.backend.models.amadeusResponses;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FlightOfferResponse {

    private String type;
    private String id;
    private String source;
    private Boolean instantTicketingRequired;
    private Boolean disablePricing;
    private Boolean nonHomogeneous;
    private Boolean oneWay;
    private Boolean paymentCardRequired;
    private String lastTicketingDate;
    private String lastTicketingDateTime;
    private Integer numberOfBookableSeats;
    private List<Itinerary> itineraries;
    private Price price;
    private PricingOptions pricingOptions;
    private List<String> validatingAirlineCodes;

    @JsonProperty("travelerPricings") 
    private List<TravelerPricing> travelerPricings;

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public Boolean getInstantTicketingRequired() { return instantTicketingRequired; }
    public void setInstantTicketingRequired(Boolean instantTicketingRequired) { this.instantTicketingRequired = instantTicketingRequired; }

    public Boolean getDisablePricing() { return disablePricing; }
    public void setDisablePricing(Boolean disablePricing) { this.disablePricing = disablePricing; }

    public Boolean getNonHomogeneous() { return nonHomogeneous; }
    public void setNonHomogeneous(Boolean nonHomogeneous) { this.nonHomogeneous = nonHomogeneous; }

    public Boolean getOneWay() { return oneWay; }
    public void setOneWay(Boolean oneWay) { this.oneWay = oneWay; }

    public Boolean getPaymentCardRequired() { return paymentCardRequired; }
    public void setPaymentCardRequired(Boolean paymentCardRequired) { this.paymentCardRequired = paymentCardRequired; }

    public String getLastTicketingDate() { return lastTicketingDate; }
    public void setLastTicketingDate(String lastTicketingDate) { this.lastTicketingDate = lastTicketingDate; }

    public String getLastTicketingDateTime() { return lastTicketingDateTime; }
    public void setLastTicketingDateTime(String lastTicketingDateTime) { this.lastTicketingDateTime = lastTicketingDateTime; }

    public Integer getNumberOfBookableSeats() { return numberOfBookableSeats; }
    public void setNumberOfBookableSeats(Integer numberOfBookableSeats) { this.numberOfBookableSeats = numberOfBookableSeats; }

    public List<Itinerary> getItineraries() { return itineraries; }
    public void setItineraries(List<Itinerary> itineraries) { this.itineraries = itineraries; }

    public Price getPrice() { return price; }
    public void setPrice(Price price) { this.price = price; }

    public PricingOptions getPricingOptions() { return pricingOptions; }
    public void setPricingOptions(PricingOptions pricingOptions) { this.pricingOptions = pricingOptions; }

    public List<String> getValidatingAirlineCodes() { return validatingAirlineCodes; }
    public void setValidatingAirlineCodes(List<String> validatingAirlineCodes) { this.validatingAirlineCodes = validatingAirlineCodes; }

    public List<TravelerPricing> getTravelerPricings() { return travelerPricings; }
    public void setTravelerPricings(List<TravelerPricing> travelerPricings) { this.travelerPricings = travelerPricings; }
}