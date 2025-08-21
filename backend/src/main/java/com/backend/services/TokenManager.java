package com.backend.services;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

import com.backend.models.tokenResponse;

import reactor.core.publisher.Mono;

@Service 
public class TokenManager {
    
    private Mono<tokenResponse> accessTokenResponse;
    private String clientID = System.getProperty("CLIENT_ID");
    private String clientSecret = System.getProperty("CLIENT_SECRET");

    // TODO: Consider a better way to initialize the token manager, 
    // it starts fetching the token twice.
    private TokenManager() {
        fetchAccessToken();
    }

    private final WebClient webClient = WebClient.builder()
            .defaultHeader("Content-Type", "application/x-www-form-urlencoded")
            .build();

    private void fetchAccessToken() {

        if (accessTokenResponse != null) {
            return;
        }

        System.out.println("===== Fetching access token... =====");

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "client_credentials");
        body.add("client_id", clientID);
        body.add("client_secret", clientSecret);

        try {
            Mono<tokenResponse> response = webClient.post()
                    .uri("https://test.api.amadeus.com/v1/security/oauth2/token")
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(tokenResponse.class);
            accessTokenResponse = response;
        } catch (Exception e) {
            System.err.println("Error fetching access token: " + e.getMessage());
        }
    }

    @Scheduled(fixedRate = 1798 * 1000)
    private void refreshAccessToken() {
        accessTokenResponse = null;
        fetchAccessToken();
    }

    public String getAccessToken() {
        return accessTokenResponse.block().getAccess_token();
    }

}
