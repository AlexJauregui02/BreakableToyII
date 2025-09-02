package com.backend.models.amadeusResponses;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
class Segment {
    private String id;
    private Integer numberOfStops;
    private Boolean blacklistedInEU;

    @JsonProperty("co2Emissions")
    private List<CO2Emission> co2Emissions;

    private FlightEndPoint departure;
    private FlightEndPoint arrival;

    private String carrierCode;
    private String number;
    private AircraftEquipment aircraft;
    private OperatingFlight operating;
    private String duration;

    @JsonProperty("stops")
    private List<FlightStop> stops;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Integer getNumberOfStops() { return numberOfStops; }
    public void setNumberOfStops(Integer numberOfStops) { this.numberOfStops = numberOfStops; }

    public Boolean getBlacklistedInEU() { return blacklistedInEU; }
    public void setBlacklistedInEU(Boolean blacklistedInEU) { this.blacklistedInEU = blacklistedInEU; }

    public List<CO2Emission> getCo2Emissions() { return co2Emissions; }
    public void setCo2Emissions(List<CO2Emission> co2Emissions) { this.co2Emissions = co2Emissions; }

    public FlightEndPoint getDeparture() { return departure; }
    public void setDeparture(FlightEndPoint departure) { this.departure = departure; }

    public FlightEndPoint getArrival() { return arrival; }
    public void setArrival(FlightEndPoint arrival) { this.arrival = arrival; }

    public String getCarrierCode() { return carrierCode; }
    public void setCarrierCode(String carrierCode) { this.carrierCode = carrierCode; }

    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    public AircraftEquipment getAircraft() { return aircraft; }
    public void setAircraft(AircraftEquipment aircraft) { this.aircraft = aircraft; }

    public OperatingFlight getOperating() { return operating; }
    public void setOperating(OperatingFlight operating) { this.operating = operating; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public List<FlightStop> getStops() { return stops; }
    public void setStops(List<FlightStop> stops) { this.stops = stops; }
}