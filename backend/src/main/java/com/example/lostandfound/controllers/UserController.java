package com.example.lostandfound.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lostandfound.models.User;
import com.example.lostandfound.repositories.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Crucial: Allows React to connect
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 1. REGISTER ENDPOINT
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User newUser) {
        // Check if email already exists
        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already registered");
        }
        
        // Save the new user to MongoDB
        User savedUser = userRepository.save(newUser);
        return ResponseEntity.ok(savedUser);
    }

    // 2. LOGIN ENDPOINT
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();
            // Check if passwords match
            if (existingUser.getPassword().equals(loginRequest.getPassword())) {
                
                // Return a success object (in the future, return a JWT token here)
                Map<String, String> response = new HashMap<>();
                response.put("message", "Login successful");
                response.put("email", existingUser.getEmail());
                return ResponseEntity.ok(response);
            }
        }
        
        // If email not found or password incorrect
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }
}