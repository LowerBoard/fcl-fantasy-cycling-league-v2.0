package com.fcl.fcl_backend.controllers;

import com.fcl.fcl_backend.models.Rider;
import com.fcl.fcl_backend.repositories.RaceRepository;
import com.fcl.fcl_backend.repositories.RiderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@RestController // tells Spring that this class is a REST controller and should handle HTTP requests
@RequestMapping("/api/riders")
@CrossOrigin(origins = "http://localhost:5173") //
public class RiderController {

    @Autowired
    private RiderRepository riderRepository;

    @Autowired
    private RaceRepository raceRepository;

    @GetMapping
    public List<Rider> getAllRiders() {
        return riderRepository.findAll();
    }

    @PostMapping // This endpoint allows us to add a single rider to the database, which is useful for testing and adding individual riders.
    public Rider addRider(@RequestBody Rider rider) {
        return riderRepository.save(rider);
    }

    @PostMapping("/peloton")// This endpoint allows us to add multiple riders at once, which is useful for populating the peloton with a large number of riders.
    public List<Rider> addRiders(@RequestBody List<Rider> riders) {
        return riderRepository.saveAll(riders);
    }

    @GetMapping("/race/{raceId}")
    public List<Rider> getRidersByRace(@PathVariable Long raceId) {
        return raceRepository.findById(raceId)
                .map(race -> race.getRiders())
                .orElse(Collections.emptyList());
    }
}
