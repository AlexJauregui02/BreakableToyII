package com.backend.services;

import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

import com.backend.models.tokenResponse;

@Service 
public class TokenManager {
    
    private String accessToken;
    private final Environment env;

    // TODO: Consider a better way to initialize the token manager, 
    // it starts fetching the token twice.
    public TokenManager(Environment env) {
        this.env = env;
        fetchAccessToken();
    }

    private final WebClient webClient = WebClient.builder()
            .defaultHeader("Content-Type", "application/x-www-form-urlencoded")
            .build();
    
    protected WebClient getWebClient() {
        return this.webClient;
    }

    public void fetchAccessToken() {
        String clientID = env.getProperty("CLIENT_ID");
        String clientSecret = env.getProperty("CLIENT_SECRET");

        System.out.println("===== Fetching access token... =====");

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "client_credentials");
        body.add("client_id", clientID);
        body.add("client_secret", clientSecret);

        try {
            tokenResponse response = getWebClient().post()
                    .uri("https://test.api.amadeus.com/v1/security/oauth2/token")
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(tokenResponse.class)
                    .block();
            accessToken = response.getAccess_token();
        } catch (Exception e) {
            System.err.println("Error fetching access token: " + e.getMessage());
        }
    }

    @Scheduled(fixedRate = 1500 * 1000)
    public void refreshAccessToken() {
        fetchAccessToken();
    }

    public String getAccessToken() {
        return accessToken;
    }

}
