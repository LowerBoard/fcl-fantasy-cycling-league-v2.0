package com.fcl.fcl_backend.controllers;

import com.fcl.fcl_backend.models.League;
import com.fcl.fcl_backend.models.User;
import com.fcl.fcl_backend.models.UserTeam;
import com.fcl.fcl_backend.repositories.UserRepository;
import com.fcl.fcl_backend.repositories.UserTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // This annotation allows cross-origin requests from the frontend (which is likely running on a different port)
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserTeamRepository userTeamRepository;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginCredentials) {
        return userRepository.findByEmail(loginCredentials.getEmail())
                .filter(user -> user.getPassword().equals(loginCredentials.getPassword())) // Check if the password matches
                .map(user -> ResponseEntity.ok(user))// If the user is found and the password matches, return the user object with a 200 OK status
                .orElse(ResponseEntity.status(401).build()); // If the user is not found or the password does not match, return a 401 Unauthorized status
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User savedUser = userRepository.save(user); // Save the user to the database first to get the generated ID

            UserTeam newTeam = new UserTeam(); // Create a new UserTeam for the newly registered user
            newTeam.setTeamName(savedUser.getUsername());
            newTeam.setUser(savedUser);
            newTeam.setTotalPoints(0.0);

            League defaultLeague = new League(); // Create a default league for the user
            defaultLeague.setId(1L); // FCL GLobal has an ID of 1 in the database, so we can set it directly here
            newTeam.setLeague(defaultLeague);

            userTeamRepository.save(newTeam); // Save the new UserTeam to the database

            return ResponseEntity.ok(savedUser); // Return the saved user object with a 200 OK status
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("Error registering user: " + e.getMessage()); // If there is an error during registration, return a 500 Internal Server Error status with the error message
        }
    }
}
