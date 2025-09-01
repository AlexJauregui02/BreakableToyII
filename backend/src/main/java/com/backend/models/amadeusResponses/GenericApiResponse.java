package com.backend.models.amadeusResponses;

import java.util.List;

public class GenericApiResponse<T> {
    private Meta meta;
    private List<T> data;

    // Getters and Setters
    public Meta getMeta() { return meta; }
    public void setMeta(Meta meta) { this.meta = meta; }

    public List<T> getData() { return data; }
    public void setData(List<T> data) { this.data = data; }
}
