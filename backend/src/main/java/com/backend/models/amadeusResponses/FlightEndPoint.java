package com.backend.models.amadeusResponses;

public class FlightEndPoint {
    private String iataCode;
    private String terminal;
    private String at;

    // Getters and Setters
    public String getIataCode() { return iataCode; }
    public void setIataCode(String iataCode) { this.iataCode = iataCode; }

    public String getTerminal() { return terminal; }
    public void setTerminal(String terminal) { this.terminal = terminal; }

    public String getAt() { return at; }
    public void setAt(String at) { this.at = at; }
}
