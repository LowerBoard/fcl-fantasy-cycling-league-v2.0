package com.fcl.fcl_backend.controllers;

import com.fcl.fcl_backend.models.User;
import com.fcl.fcl_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // This annotation allows cross-origin requests from the frontend (which is likely running on a different port)
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginCredentials) {
        return userRepository.findByEmail(loginCredentials.getEmail())
                .filter(user -> user.getPassword().equals(loginCredentials.getPassword()))
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.status(401).build());
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        // add validation and password hashing here
        return userRepository.save(user);
    }
}
