package com.fcl.fcl_backend.controllers;

import com.fcl.fcl_backend.models.League;
import com.fcl.fcl_backend.repositories.LeagueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leagues")
@CrossOrigin(origins = "http://localhost:5173") // This annotation allows cross-origin requests from the frontend (which is likely running on a different port)
public class LeagueController {

    @Autowired
    private LeagueRepository leagueRepository;

    @GetMapping
    public List<League> getAllLeagues() {
        return leagueRepository.findAll();
    }

    @PostMapping
    public League createLeague(@RequestBody League league) {
        return leagueRepository.save(league);
    }
}
