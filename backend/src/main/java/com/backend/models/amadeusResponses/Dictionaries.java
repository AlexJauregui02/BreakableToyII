package com.backend.models.amadeusResponses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Dictionaries {
    private Map<String, Location> locations;
    private Map<String, String> aircraft;
    private Map<String, String> currencies;
    private Map<String, String> carriers;

    // Getters and Setters
    public Map<String, Location> getLocations() { return locations; }
    public void setLocations(Map<String, Location> locations) { this.locations = locations; }

    public Map<String, String> getAircraft() { return aircraft; }
    public void setAircraft(Map<String, String> aircraft) { this.aircraft = aircraft; }

    public Map<String, String> getCurrencies() { return currencies; }
    public void setCurrencies(Map<String, String> currencies) { this.currencies = currencies; }

    public Map<String, String> getCarriers() { return carriers; }
    public void setCarriers(Map<String, String> carriers) { this.carriers = carriers; }
}
