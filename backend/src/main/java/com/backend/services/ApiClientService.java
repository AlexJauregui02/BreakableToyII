package com.backend.services;

import java.time.Duration;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.backend.models.amadeusResponses.FlightOfferResponse;
import com.backend.models.amadeusResponses.GenericApiResponse;
import com.backend.models.flightOfferTypes.flightOfferBodyResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import reactor.core.publisher.Mono;

@Service
public class ApiClientService {

    private final WebClient webClient;
    private final TokenManager TokenManager;
    private final ObjectMapper objectMapper;

    public ApiClientService(WebClient.Builder webClientBuilder, 
                            TokenManager TokenManager,
                            ObjectMapper objectMapper) {
        this.webClient = webClientBuilder
            .baseUrl("https://test.api.amadeus.com")
            .codecs(configurer -> configurer
                .defaultCodecs()
                .maxInMemorySize(10 * 1024 * 1024) // 10 MB
            )
            .build();
        this.TokenManager = TokenManager;
        this.objectMapper = objectMapper;
    }
    
    private Mono<String> get(String endpoint) {
        String AccessToken = TokenManager.getAccessToken();

        return webClient.get()
                .uri(endpoint)
                .header("Authorization", "Bearer " + AccessToken)
                .retrieve()
                .bodyToMono(String.class)
                .doOnError(error -> {
                    System.err.println("Error making GET request: " + error.getMessage());
                    if (error instanceof org.springframework.web.reactive.function.client.WebClientResponseException) {
                        System.err.println("Response body: " + ((org.springframework.web.reactive.function.client.WebClientResponseException) error).getResponseBodyAsString());
                    }
                });
    }

    // TODO: Generalize POST method for other endpoints
    private Mono<String> post(String endpoint, Object body) {
        String AccessToken = TokenManager.getAccessToken();

        return webClient.post()
                .uri(endpoint)
                .header("Authorization", "Bearer " + AccessToken)
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

    // Return flight offers based on criteria using POST
    // Example: /shopping/flight-offers
    public Mono<String> postFlightOffersOnCriteria(flightOfferBodyResponse body) {
        
        String endpoint = "/v2/shopping/flight-offers";
        return post(endpoint, body)
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
            Integer max,
            String[] sortBy,
            String sortOrder) {

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

        return get(uri)
        .flatMap(json -> {
            try {
                JavaType type = objectMapper.getTypeFactory()
                    .constructParametricType(GenericApiResponse.class, FlightOfferResponse.class);

                GenericApiResponse<FlightOfferResponse> response =
                    objectMapper.readValue(json, type);

                response.setData(sortOffers(response.getData(), sortBy, sortOrder));

                return Mono.just(objectMapper.writeValueAsString(response));
            } catch (JsonProcessingException e) {
                return Mono.error(new RuntimeException("Error deserializando respuesta", e));
            }
        });
    }

    private List<FlightOfferResponse> sortOffers(List<FlightOfferResponse> offers, String[] sortBy, String sortOrder) {
        Comparator<FlightOfferResponse> comparator = null;

        for (String key : sortBy) {
            Comparator<FlightOfferResponse> current = switch (key.toLowerCase()) {
                case "price" -> java.util.Comparator.<FlightOfferResponse>comparingDouble(
                    o -> safeParseDouble(o != null && o.getPrice() != null ? o.getPrice().getGrandTotal() : null)
                );
                case "duration" -> java.util.Comparator.<FlightOfferResponse>comparingInt(
                    o -> parseDuration(firstItineraryDuration(o))
                );
                default -> null;
            };

            if (current != null) {
                comparator = (comparator == null) ? current : comparator.thenComparing(current);
            }
        }

        if (comparator == null) return offers;
        if ("desc".equalsIgnoreCase(sortOrder)) comparator = comparator.reversed();

        return offers.stream().sorted(comparator).collect(Collectors.toList());
    }

    private static String firstItineraryDuration(FlightOfferResponse o) {
        if (o == null || o.getItineraries() == null || o.getItineraries().isEmpty()) return null;
        return o.getItineraries().get(0).getDuration();
    }

    private static int parseDuration(String isoDuration) {
        try {
            return (isoDuration == null) ? Integer.MAX_VALUE : (int) Duration.parse(isoDuration).toMinutes();
        } catch (Exception e) {
            return Integer.MAX_VALUE;
        }
    }

    private static double safeParseDouble(String s) {
        try {
            return (s == null) ? Double.POSITIVE_INFINITY : Double.parseDouble(s);
        } catch (Exception e) {
            return Double.POSITIVE_INFINITY;
        }
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
    public Mono<String> airportAndCitiesSearch(String subType, String keyword, Integer page, Integer offset, String sort, String view, String countryCode) {
        StringBuilder uriBuilder = new StringBuilder("/v1/reference-data/locations?");
        if (subType != null) uriBuilder.append("subType=").append(subType).append("&");
        if (keyword != null) uriBuilder.append("keyword=").append(keyword).append("&");
        if (countryCode != null) uriBuilder.append("countryCode=").append(countryCode).append("&");
        if (page != null) uriBuilder.append("page[limit]=").append(page).append("&");
        if (offset != null) uriBuilder.append("page[offset]=").append(offset).append("&");
        if (sort != null) uriBuilder.append("sort=").append(sort).append("&");
        if (view != null) uriBuilder.append("view=").append(view).append(view != null ? "&" : "");

        String uri = uriBuilder.toString();
        return get(uri);
    }

}
