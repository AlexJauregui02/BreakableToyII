package com.backend.models.amadeusResponses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
class AmenityProvider {
    private String name;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
