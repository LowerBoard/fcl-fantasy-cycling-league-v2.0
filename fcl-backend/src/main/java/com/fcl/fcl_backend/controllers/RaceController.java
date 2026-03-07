package com.fcl.fcl_backend.controllers;

import com.fcl.fcl_backend.models.Race;
import com.fcl.fcl_backend.repositories.RaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/races")
public class RaceController {

    @Autowired
    private RaceRepository raceRepository;

    @GetMapping
    public List<Race> getAllRaces() {
        return raceRepository.findAll();
    }

    @PostMapping
    public Race createRace(@RequestBody Race race) {
        return raceRepository.save(race);
    }
}
