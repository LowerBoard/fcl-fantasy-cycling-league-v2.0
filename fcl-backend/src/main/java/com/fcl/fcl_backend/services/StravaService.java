package com.fcl.fcl_backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;


@Service
public class StravaService {

    @Value("${strava.access.token}")
    private String accessToken;

    public String getMyRecentActivities() {
        String url = "https://www.strava.com/api/v3/athlete/activities?per_page=10"; // This URL is the endpoint for fetching the authenticated athlete's recent activities. The "per_page=10" query parameter limits the response to the 10 most recent activities.

        RestTemplate restTemplate = new RestTemplate(); // RestTemplate is a Spring class that simplifies making HTTP requests. It provides methods for sending HTTP requests and handling responses, making it easier to interact with RESTful APIs like Strava's.

        HttpHeaders headers = new HttpHeaders(); // HttpHeaders is a class that allows you to set HTTP headers for your request. In this case, we need to set the "Authorization" header to include the Bearer token for authentication with the Strava API.
        headers.set("Authorization", "Bearer " + accessToken); // This line sets the "Authorization" header to "Bearer " followed by the access token. This is the standard way to authenticate with APIs that use Bearer tokens, such as Strava's API.

        HttpEntity<String> entity = new HttpEntity<>(headers); // HttpEntity is a class that represents an HTTP request or response entity, including headers and body. In this case, we are creating an HttpEntity with the headers we just set, and no body (since it's a GET request).

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            return response.getBody();
        } catch (Exception e) {
            System.out.println("Error fetching Strava data: " + e.getMessage());
            return null;
        }



    }}
