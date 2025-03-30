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

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private MyUserDetailsService userDetailsService;

    public UserController(UserService service) {
    }

    @PostMapping(value = "/register", produces = "application/json")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (service.userExists(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\": \"Username is already taken.\"}");
        }
        service.register(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\": \"User registered successfully.\"}");
    }

    @PutMapping(value = "/update", produces = "application/json")
    public ResponseEntity<String> updateUser(@RequestBody User user) {
        if (!service.userExists(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"User not found.\"}");
        }
        service.updateUser(user);
        return ResponseEntity.ok("{\"message\": \"User updated successfully.\"}");
    }

    @PostMapping(value = "/login", produces = "application/json")
    public ResponseEntity<LoginResponse> login(@RequestBody User user) {
        String token = service.verify(user);
        if ("fail".equals(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        UserPrincipal userPrincipal = (UserPrincipal) userDetails;
        return ResponseEntity.ok(new LoginResponse(token, userPrincipal.getUser()));
    }
}