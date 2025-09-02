package com.backend.models.amadeusResponses;

public class FlightStop {
    private String iataCode;
    private String duration;
    private String arrivalAt;
    private String departureAt;

    // Getters and Setters
    public String getIataCode() { return iataCode; }
    public void setIataCode(String iataCode) { this.iataCode = iataCode; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getArrivalAt() { return arrivalAt; }
    public void setArrivalAt(String arrivalAt) { this.arrivalAt = arrivalAt; }

    public String getDepartureAt() { return departureAt; }
    public void setDepartureAt(String departureAt) { this.departureAt = departureAt; }
}