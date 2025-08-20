package com.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.service.ApiClientService;

import reactor.core.publisher.Mono;

@RestController
public class ApiController {
    
    private final ApiClientService apiClientService;

    public ApiController(ApiClientService apiClientService) {
        this.apiClientService = apiClientService;
    }

    @GetMapping("/api/airport-and-cities-search")
    public Mono<String> test(
            @RequestParam(value = "subType", required = true) String subType,
            @RequestParam(value = "keyword", required = true) String keyword,
            @RequestParam(value = "pageLimit", required = false) Integer page,
            @RequestParam(value = "pageOffset", required = false) Integer offset,
            @RequestParam(value = "sort", required = false) String sort,
            @RequestParam(value = "view", required = false) String view) {

        return apiClientService.AirportAndCitiesSearch(subType, keyword, page, offset, sort, view)
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
    
}
