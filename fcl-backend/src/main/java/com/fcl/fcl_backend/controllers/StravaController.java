package com.fcl.fcl_backend.controllers;

import com.fcl.fcl_backend.services.StravaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/strava")
@CrossOrigin(origins = "http://localhost:5173")
public class StravaController {

    @Autowired
    private StravaService stravaService;

    @GetMapping("/recent-activities")
    public ResponseEntity<String> getRecentActvities() {
        String stravaData = stravaService.getMyRecentActivities();

        if (stravaData != null) {
            return ResponseEntity.ok(stravaData);
        } else {
            return ResponseEntity.status(500).body("Failed to fetch Strava data");
        }
    }
}
