package com.backend.models.amadeusResponses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
class ChargeableSeat {
    private String id;
    private String number;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }
}

enum ServiceName { PRIORITY_BOARDING, AIRPORT_CHECKIN }
