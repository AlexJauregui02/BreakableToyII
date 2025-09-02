package com.backend.models.amadeusResponses;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GenericApiResponse<T> {
    private Meta meta;
    private List<T> data;
    private Dictionaries dictionaries;

    // Getters and Setters
    public Meta getMeta() { return meta; }
    public void setMeta(Meta meta) { this.meta = meta; }

    public List<T> getData() { return data; }
    public void setData(List<T> data) { this.data = data; }

    public Dictionaries getDictionaries() { return dictionaries; }
    public void setDictionaries(Dictionaries dictionaries) { this.dictionaries = dictionaries; }
}
