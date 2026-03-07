package com.fcl.fcl_backend.controllers;

import com.fcl.fcl_backend.models.League;
import com.fcl.fcl_backend.models.User;
import com.fcl.fcl_backend.models.UserTeam;
import com.fcl.fcl_backend.repositories.LeagueRepository;
import com.fcl.fcl_backend.repositories.UserRepository;
import com.fcl.fcl_backend.repositories.UserTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/teams")
@CrossOrigin // This annotation allows cross-origin requests from the frontend (which is likely running on a different port)
public class UserTeamController {            // This controller will handle requests related to user teams, such as creating a team, adding riders to a team, and calculating team points.

    @Autowired
    private UserTeamRepository userTeamRepository;

    @Autowired
    private LeagueRepository leagueRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<UserTeam> getAllUserTeams() {
        return userTeamRepository.findAll();
    }

    @PostMapping
    public UserTeam createUserTeam(@RequestBody UserTeam userTeam) {

        Long leagueId = userTeam.getLeague().getId(); // Get the league ID from the user team object
        League actualLeague = leagueRepository.findById(leagueId)
                .orElseThrow(() -> new RuntimeException("League not found with id: " + leagueId)); // Fetch the actual league from the database
        userTeam.setLeague(actualLeague); // Set the actual league object in the user team

        Long userId = userTeam.getUser().getId(); // Get the user ID from the user team object
        User actualUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId)); // Fetch the actual user from the database
        return userTeamRepository.save(userTeam);
    }


}
