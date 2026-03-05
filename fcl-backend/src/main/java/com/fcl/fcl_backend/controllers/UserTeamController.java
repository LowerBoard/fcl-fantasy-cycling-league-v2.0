package com.fcl.fcl_backend.controllers;

import com.fcl.fcl_backend.models.UserTeam;
import com.fcl.fcl_backend.repositories.UserTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/api/teams")
public class UserTeamController {            // This controller will handle requests related to user teams, such as creating a team, adding riders to a team, and calculating team points.

    @Autowired
    private UserTeamRepository userTeamRepository;

    @GetMapping
    public List<UserTeam> getAllUserTeams() {
        return userTeamRepository.findAll();
    }

    @PostMapping
    public UserTeam createUserTeam(UserTeam userTeam) {
        return userTeamRepository.save(userTeam);
    }


}
