package com.fcl.fcl_backend.controllers;

import com.fcl.fcl_backend.models.Roster;
import com.fcl.fcl_backend.repositories.RiderRepository;
import com.fcl.fcl_backend.repositories.RosterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.sql.RowSetReader;
import java.util.List;

@RestController
@RequestMapping("/api/rosters")
@CrossOrigin(origins = "http://localhost:5173")// Allow cross-origin requests from any domain (you can specify allowed origins if needed)
public class RosterController {

    @Autowired
    private RosterRepository rosterRepository;

    @Autowired
    private RiderRepository riderRepository;

    @PostMapping
    public Roster createRoster(@RequestBody Roster roster) {
        return rosterRepository.save(roster);
    } // Save the roster to the database

    @GetMapping("/{id}")
    public Roster getRosterById(@PathVariable Long id) {
        return rosterRepository.findById(id).orElse(null);
    } // Retrieve roster by ID

    @PutMapping("/{id}/riders")
    public Roster updateRosterRiders(@PathVariable Long id, @RequestBody List<Long> riderIds) {
        Roster roster = rosterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Roster not found with id " + id));
        roster.setRiders(riderRepository.findAllById(riderIds));
        return rosterRepository.save(roster);
    } // Update the riders in the roster by providing a list of rider IDs
}
