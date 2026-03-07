package com.fcl.fcl_backend.controllers;

import com.fcl.fcl_backend.models.Rider;
import com.fcl.fcl_backend.repositories.RiderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // tells Spring that this class is a REST controller and should handle HTTP requests
@RequestMapping("/api/riders")
@CrossOrigin //
public class RiderController {
    @Autowired
    private RiderRepository riderRepository;

    @GetMapping
    public List<Rider> getAllRiders() {
        return riderRepository.findAll();
    }

    @PostMapping
    public Rider addRider(@RequestBody Rider rider) {
        return riderRepository.save(rider);
    }
}
