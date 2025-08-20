package com.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

import com.backend.model.tokenResponse;

import reactor.core.publisher.Mono;

@Service 
public class AuthService {
    
    private Mono<tokenResponse> accessTokenResponse;
    @Value("${CLIENT_ID}") String clientID;
    @Value("${CLIENT_SECRET}") String clientSecret;

    private final WebClient webClient = WebClient.builder()
            .defaultHeader("Content-Type", "application/x-www-form-urlencoded")
            .build();

    public void fetchAccessToken() {

        if (accessTokenResponse != null && accessTokenResponse.block() != null) {
            return;
        }

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

    // TODO: Remove this method once the access token is fetched automatically
    public String getAccessToken() {
        fetchAccessToken();
        return accessTokenResponse.block().getAccess_token();
    }

}
