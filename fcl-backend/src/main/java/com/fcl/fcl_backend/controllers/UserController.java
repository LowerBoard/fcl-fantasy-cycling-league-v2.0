package com.fcl.fcl_backend.controllers;

import com.fcl.fcl_backend.models.User;
import com.fcl.fcl_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin // This annotation allows cross-origin requests from the frontend (which is likely running on a different port)
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        // add validation and password hashing here
        return userRepository.save(user);
    }
}
