
package com.chamara.The.Home.Services.Booking.System.controller;


import com.chamara.The.Home.Services.Booking.System.model.Comment;
import com.chamara.The.Home.Services.Booking.System.model.LoginResponse;
import com.chamara.The.Home.Services.Booking.System.model.User;
import com.chamara.The.Home.Services.Booking.System.model.UserPrincipal;
import com.chamara.The.Home.Services.Booking.System.repo.CommentRepository;
import com.chamara.The.Home.Services.Booking.System.repo.UserRepository;
import com.chamara.The.Home.Services.Booking.System.service.JWTService;
import com.chamara.The.Home.Services.Booking.System.service.MyUserDetailsService;
import com.chamara.The.Home.Services.Booking.System.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin

public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService service;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private MyUserDetailsService userDetailsService;
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (service.userExists(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username is already taken.");
        }
        service.register(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully.");
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User user) {
        String token = service.verify(user);
        if ("fail".equals(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        UserPrincipal userPrincipal = (UserPrincipal) userDetails;
        return ResponseEntity.ok(new LoginResponse(token, userPrincipal.getUser()));
    }


    @PutMapping("/user/{id}")
    public ResponseEntity<String> editUser(@PathVariable String id, @RequestBody User updatedUser) {
        Optional<User> existingUserOptional = userRepository.findById(id);
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();

            // Update only fields that are non-null in the incoming request
            if (updatedUser.getUsername() != null) existingUser.setUsername(updatedUser.getUsername());
            if (updatedUser.getPassword() != null) existingUser.setPassword(updatedUser.getPassword());

            userRepository.save(existingUser);
            return ResponseEntity.ok("User with ID " + id + " updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID " + id + " not found.");
        }
    }

}
