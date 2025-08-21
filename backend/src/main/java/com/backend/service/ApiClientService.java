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
            .codecs(configurer -> configurer
                .defaultCodecs()
                .maxInMemorySize(10 * 1024 * 1024) // 10 MB
            )
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

    private Mono<String> post(String endpoint, Object body) {

        return webClient.post()
                .uri(endpoint)
                .header("X-HTTP-Method-Override", "GET")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .doOnError(error -> {
                    System.err.println("Error making POST request: " + error.getMessage());
                    if (error instanceof org.springframework.web.reactive.function.client.WebClientResponseException) {
                        System.err.println("Response body: " + ((org.springframework.web.reactive.function.client.WebClientResponseException) error).getResponseBodyAsString());
                    }
                });
    }

    public Mono<String> postFlightOffersOnCriteria() {
        String endpoint = "/v2/shopping/flight-offers";
        return post(endpoint, null)
                .onErrorComplete(error -> {
                    System.err.println("Error in postFlightOffersOnCriteria: " + error.getMessage());
                    return true; 
                });
    }

    // Return flight offers based on criteria
    // Example: /shopping/flight-offers?originLocationCode=NYC
    // &destinationLocationCode=LON&departureDate=2023-12-01
    // &returnDate=2023-12-15&adults=1&children=0&infants=0
    // &travelClass=ECONOMY&includedAirlineCodes=BA&excludedAirlineCodes=AA
    // &nonStop=true&currencyCode=USD&maxPrice=1000&max=10
    public Mono<String> getFlightOffersOnCriteria(
            String originLocationCode, 
            String destinationLocationCode, 
            String destinationDate,
            String returnDate,
            Integer adults,
            Integer children,
            Integer infants,
            String travelClass,
            String includedAirlineCodes,
            String excludedAirlineCodes,
            Boolean nonStop,
            String currencyCode,
            Integer maxPrice,
            Integer max) {

        StringBuilder uriBuilder = new StringBuilder("/v2/shopping/flight-offers?");
        if (originLocationCode != null) uriBuilder.append("originLocationCode=").append(originLocationCode).append("&");
        if (destinationLocationCode != null) uriBuilder.append("destinationLocationCode=").append(destinationLocationCode).append("&");
        if (destinationDate != null) uriBuilder.append("departureDate=").append(destinationDate).append("&");
        if (returnDate != null) uriBuilder.append("returnDate=").append(returnDate).append("&");
        if (adults != null) uriBuilder.append("adults=").append(adults).append("&");
        if (children != null) uriBuilder.append("children=").append(children).append("&");
        if (infants != null) uriBuilder.append("infants=").append(infants).append("&");
        if (travelClass != null) uriBuilder.append("travelClass=").append(travelClass).append("&");
        if (includedAirlineCodes != null) uriBuilder.append("includedAirlineCodes=").append(includedAirlineCodes).append("&");
        if (excludedAirlineCodes != null) uriBuilder.append("excludedAirlineCodes=").append(excludedAirlineCodes).append("&");
        if (nonStop != null) uriBuilder.append("nonStop=").append(nonStop).append("&");
        if (currencyCode != null) uriBuilder.append("currencyCode=").append(currencyCode).append("&");
        if (maxPrice != null) uriBuilder.append("maxPrice=").append(maxPrice).append("&");
        if (max != null) uriBuilder.append("max=").append(max).append("&");


        String uri = uriBuilder.toString();
        return get(uri);
    }

    // Return airlines information by airline code
    // Example: /reference-data/airlines?airlineCodes=BA
    public Mono<String> getAirlineInformation(String airlineCode) {
        StringBuilder uriBuilder = new StringBuilder("/v1/reference-data/airlines?");
        if (airlineCode != null) uriBuilder.append("airlineCodes=").append(airlineCode);

        String uri = uriBuilder.toString();
        return get(uri);
    }

    // TODO: Add missing method for AirportAndCitiesSearch: /{locationId}
    // Example: /reference-data/locations?subType=AIRPORT&keyword=London&page[limit]=10&page[offset]=0&sort=rank&view=FULL
    public Mono<String> AirportAndCitiesSearch(String subType, String keyword, Integer page, Integer offset, String sort, String view) {
        StringBuilder uriBuilder = new StringBuilder("/v1/reference-data/locations?");
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
