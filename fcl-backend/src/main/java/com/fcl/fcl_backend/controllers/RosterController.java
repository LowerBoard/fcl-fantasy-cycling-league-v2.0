package com.fcl.fcl_backend.controllers;

import com.fcl.fcl_backend.models.Roster;
import com.fcl.fcl_backend.repositories.RaceRepository;
import com.fcl.fcl_backend.repositories.RiderRepository;
import com.fcl.fcl_backend.repositories.RosterRepository;
import com.fcl.fcl_backend.repositories.UserTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/rosters")
@CrossOrigin(origins = "http://localhost:5173")// Allow cross-origin requests from any domain (you can specify allowed origins if needed)
public class RosterController {

    @Autowired
    private RosterRepository rosterRepository;

    @Autowired
    private RiderRepository riderRepository;

    @Autowired
    private RaceRepository raceRepository;

    @Autowired
    private UserTeamRepository userTeamRepository;

    @PostMapping
    public Roster createRoster(@RequestBody Roster roster) {
        return rosterRepository.save(roster);
    } // Save the roster to the database

    @GetMapping("/{id}")
    public Roster getRosterById(@PathVariable Long id) {
        return rosterRepository.findById(id).orElse(null);
    } // Retrieve roster by ID

    @GetMapping("/userteam/{teamId}/race/{raceId}")
    public ResponseEntity<Roster> getOrCreateRoster(@PathVariable Long teamId, @PathVariable Long raceId) {
        return rosterRepository.findByUserTeamIdAndRaceId(teamId, raceId)
                .map(ResponseEntity::ok) // If a roster is found, return it with a 200 OK status
                .orElseGet(() -> {
                    Roster newRoster = new Roster();

                    newRoster.setUserTeam(userTeamRepository.findById(teamId).orElseThrow());// Set the user team for the roster, throwing an exception if the team is not found
                    newRoster.setRace(raceRepository.findById(raceId).orElseThrow()); // Set the race for the roster, throwing an exception if the race is not found
                    newRoster.setRiders(new ArrayList<>());

                    Roster savedRoster = rosterRepository.saveAndFlush(newRoster);
                    return new ResponseEntity<>(savedRoster, HttpStatus.CREATED);
                }); // Return the newly created roster with a 201 Created status
    }

    @PutMapping("/{id}/riders")
    public Roster updateRosterRiders(@PathVariable Long id, @RequestBody List<Long> riderIds) {
        Roster roster = rosterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Roster not found with id " + id));
        roster.setRiders(riderRepository.findAllById(riderIds));
        return rosterRepository.save(roster);
    } // Update the riders in the roster by providing a list of rider IDs

    @DeleteMapping("/{rosterId}/riders/{riderId}")
    public ResponseEntity<?> removeRiderFromRoster(@PathVariable Long rosterId, @PathVariable Long riderId) {
        Roster roster = rosterRepository.findById(rosterId)
                .orElseThrow(() -> new RuntimeException("Roster not found with id " + rosterId));
        roster.getRiders().removeIf(rider -> rider.getId().equals(riderId));
        rosterRepository.save(roster);
        return ResponseEntity.ok().build();
    }

}
