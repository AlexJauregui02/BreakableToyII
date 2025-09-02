package com.backend.models.amadeusResponses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
class AircraftEquipment {
    private String code;

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
}
