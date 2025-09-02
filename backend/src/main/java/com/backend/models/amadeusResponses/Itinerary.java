package com.backend.models.amadeusResponses;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Itinerary {
    private String duration;
    private List<Segment> segments;

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public List<Segment> getSegments() { return segments; }
    public void setSegments(List<Segment> segments) { this.segments = segments; }
}
