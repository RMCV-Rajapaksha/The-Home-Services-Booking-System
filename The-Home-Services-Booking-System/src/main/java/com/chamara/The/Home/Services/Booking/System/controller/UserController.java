
package com.chamara.The.Home.Services.Booking.System.controller;


import com.chamara.The.Home.Services.Booking.System.model.Comment;
import com.chamara.The.Home.Services.Booking.System.model.User;
import com.chamara.The.Home.Services.Booking.System.repo.CommentRepository;
import com.chamara.The.Home.Services.Booking.System.repo.UserRepository;
import com.chamara.The.Home.Services.Booking.System.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin

public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        return service.verify(user);
    }

}
