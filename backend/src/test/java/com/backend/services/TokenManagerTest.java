package com.backend.services;

import com.backend.models.tokenResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.core.env.Environment;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

public class TokenManagerTest {
    private Environment mockEnv;

    @BeforeEach
    void setup() {
        mockEnv = mock(Environment.class);
        when(mockEnv.getProperty("CLIENT_ID")).thenReturn("FAKE_ID");
        when(mockEnv.getProperty("CLIENT_SECRET")).thenReturn("FAKE_SECRET");
    }

    @Test
    void fetchAccessToken_success() {
        tokenResponse fakeResponse = new tokenResponse();
        fakeResponse.setAccess_token("FAKE_TOKEN");

        WebClient mockWebClient = mock(WebClient.class, RETURNS_DEEP_STUBS);
        when(mockWebClient.post()
                .uri(anyString())
                .bodyValue(any())
                .retrieve()
                .bodyToMono(eq(tokenResponse.class)))
            .thenReturn(Mono.just(fakeResponse));

        TokenManager tm = new TokenManager(mockEnv) {
            @Override
            protected WebClient getWebClient() {
                return mockWebClient;
            }
        };

        assertEquals("FAKE_TOKEN", tm.getAccessToken());
    }


    @Test
    void refreshAccessToken_success() {
        TokenManager tokenManager = Mockito.spy(new TokenManager(mockEnv));
        doNothing().when(tokenManager).fetchAccessToken();

        tokenManager.refreshAccessToken();

        verify(tokenManager, times(1)).fetchAccessToken();
    }
}