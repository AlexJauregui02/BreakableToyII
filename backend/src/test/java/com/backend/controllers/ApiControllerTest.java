package com.backend.controllers;

import com.backend.services.ApiClientService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@WebFluxTest(ApiController.class)
class ApiControllerTest {

    @Autowired
    private WebTestClient webTestClient;

    @MockBean
    private ApiClientService apiClientService;

    @Test
    void airportAndCitiesSearch_returnsOkResponse() {
        when(apiClientService.airportAndCitiesSearch("CITY", "Mexico", 10, 0, "name", null, "MX"))
                .thenReturn(Mono.just("{\"status\":\"ok\"}"));

        webTestClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/airport-and-cities-search")
                        .queryParam("subType", "CITY")
                        .queryParam("keyword", "Mexico")
                        .queryParam("pageLimit", "10")
                        .queryParam("pageOffset", "0")
                        .queryParam("sort", "name")
                        .queryParam("countryCode", "MX")
                        .build())
                .exchange()
                .expectStatus().isOk()
                .expectBody(String.class).isEqualTo("{\"status\":\"ok\"}");
    }

    @Test
    void airlineInformation_returnsOkResponse() {
        when(apiClientService.getAirlineInformation("AM"))
                .thenReturn(Mono.just("{\"airline\":\"Aeromexico\"}"));

        webTestClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/airline-information")
                        .queryParam("airlineCode", "AM")
                        .build())
                .exchange()
                .expectStatus().isOk()
                .expectBody(String.class).isEqualTo("{\"airline\":\"Aeromexico\"}");
    }


    @Test
    void flightOffers_returnsOkResponse() {
        when(apiClientService.getFlightOffersOnCriteria(
                anyString(),  // originLocationCode
                anyString(),  // destinationLocationCode
                anyString(),  // departureDate
                any(),        // returnDate
                anyInt(),     // adults
                any(),        // children
                any(),        // infants
                any(),        // travelClass
                any(),        // includedAirlineCodes
                any(),        // excludedAirlineCodes
                any(),        // nonStop
                any(),        // currencyCode
                any(),        // maxPrice
                any(),        // max
                any(),        // sortBy
                anyString()   // sortOrder
        )).thenReturn(Mono.just("{\"offers\":[]}"));

        webTestClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/flight-offers")
                        .queryParam("originLocationCode", "SFO")
                        .queryParam("destinationLocationCode", "MEX")
                        .queryParam("departureDate", "2025-09-02")
                        .queryParam("returnDate", "2025-09-10")
                        .queryParam("adults", "1")
                        .queryParam("currencyCode", "USD")
                        .queryParam("maxPrice", "1000")
                        .queryParam("max", "5")
                        .queryParam("sortBy", "price")
                        .queryParam("sortOrder", "asc")
                        .build())
                .exchange()
                .expectStatus().isOk()
                .expectBody(String.class).isEqualTo("{\"offers\":[]}");
    }
}
