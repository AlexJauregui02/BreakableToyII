package com.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.models.flightOfferTypes.flightOfferBodyResponse;
import com.backend.service.ApiClientService;

import reactor.core.publisher.Mono;

@RestController
public class ApiController {
    
    private final ApiClientService apiClientService;

    public ApiController(ApiClientService apiClientService) {
        this.apiClientService = apiClientService;
    }

    @GetMapping("/api/airport-and-cities-search")
    public Mono<String> airportAndCitiesSearch(
            @RequestParam(value = "subType", required = true) String subType,
            @RequestParam(value = "keyword", required = true) String keyword,
            @RequestParam(value = "pageLimit", required = false) Integer page,
            @RequestParam(value = "pageOffset", required = false) Integer offset,
            @RequestParam(value = "sort", required = false) String sort,
            @RequestParam(value = "view", required = false) String view) {

        return apiClientService.airportAndCitiesSearch(subType, keyword, page, offset, sort, view)
                .onErrorComplete(error -> {
                    System.err.println("Error in AirportAndCitiesMatch: " + error.getMessage());
                    return true; 
                });
    }

    @GetMapping("/api/airline-information")
    public Mono<String> getAirlineInformation(
            @RequestParam(value = "airlineCode", required = false) String airlineCode) {
        return apiClientService.getAirlineInformation(airlineCode)
                .onErrorComplete(error -> {
                    System.err.println("Error in getAirlineInformation: " + error.getMessage());
                    return true;
                });
    }

    @GetMapping("/api/flight-offers")
    public Mono<String> flightOffersOnCriteria(
            @RequestParam(value = "originLocationCode", required = true) String originLocationCode,
            @RequestParam(value = "destinationLocationCode", required = true) String destinationLocationCode,
            @RequestParam(value = "departureDate", required = true) String departureDate,
            @RequestParam(value = "returnDate", required = false) String returnDate,
            @RequestParam(value = "adults", required = true) Integer adults,
            @RequestParam(value = "children", required = false) Integer children,
            @RequestParam(value = "infants", required = false) Integer infants,
            @RequestParam(value = "travelClass", required = false) String travelClass,
            @RequestParam(value = "includedAirlineCodes", required = false) String includedAirlineCodes,
            @RequestParam(value = "excludedAirlineCodes", required = false) String excludedAirlineCodes,
            @RequestParam(value = "nonStop", required = false) Boolean nonStop,
            @RequestParam(value = "currencyCode", required = false) String currencyCode,
            @RequestParam(value = "maxPrice", required = false) Integer maxPrice,
            @RequestParam(value = "max", required = false) Integer max) {

        return apiClientService.getFlightOffersOnCriteria(
                originLocationCode, destinationLocationCode, departureDate, returnDate, adults, children, infants, 
                travelClass, includedAirlineCodes, excludedAirlineCodes, nonStop, currencyCode, maxPrice, max)
                .onErrorComplete(error -> {
                    System.err.println("Error in flightOffersOnCriteria: " + error.getMessage());
                    return true; 
                });
    }

    @PostMapping("/api/flight-offers")
    public Mono<String> postFlightOffersOnCriteria(@RequestBody(required = true) flightOfferBodyResponse body) {
        return apiClientService.postFlightOffersOnCriteria(body)
                .onErrorComplete(error -> {
                    System.err.println("Error in postFlightOffersOnCriteria: " + error.getMessage());
                    return true; 
                });
    }

}
