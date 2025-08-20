package com.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class ApiClientService {

    private final WebClient webClient;

    public ApiClientService(WebClient.Builder webClientBuilder, 
                            AuthService AuthService,
                            @Value("${BASE_URL}") String baseUrl) {
        this.webClient = webClientBuilder
            .baseUrl(baseUrl)
            .defaultHeader("Authorization", "Bearer " + AuthService.getAccessToken())
            .build();
    }
    
    private Mono<String> get(String endpoint) {

        return webClient.get()
                .uri(endpoint)
                .retrieve()
                .bodyToMono(String.class)
                .doOnError(error -> {
                    System.err.println("Error making GET request: " + error.getMessage());
                    if (error instanceof org.springframework.web.reactive.function.client.WebClientResponseException) {
                        System.err.println("Response body: " + ((org.springframework.web.reactive.function.client.WebClientResponseException) error).getResponseBodyAsString());
                    }
                });
    }

    public Mono<String> AirportAndCitiesSearch(String subType, String keyword, Integer page, Integer offset, String sort, String view) {
        StringBuilder uriBuilder = new StringBuilder("/reference-data/locations?");
        if (subType != null) uriBuilder.append("subType=").append(subType).append("&");
        if (keyword != null) uriBuilder.append("keyword=").append(keyword).append("&");
        if (page != null) uriBuilder.append("page[limit]=").append(page).append("&");
        if (offset != null) uriBuilder.append("page[offset]=").append(offset).append("&");
        if (sort != null) uriBuilder.append("sort=").append(sort).append("&");
        if (view != null) uriBuilder.append("view=").append(view).append(view != null ? "&" : "");

        String uri = uriBuilder.toString();
        return get(uri);
    }

}
