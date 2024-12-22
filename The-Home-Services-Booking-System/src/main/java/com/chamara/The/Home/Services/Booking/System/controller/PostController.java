package com.chamara.The.Home.Services.Booking.System.controller;

import com.chamara.The.Home.Services.Booking.System.PostRepository;
import com.chamara.The.Home.Services.Booking.System.model.Post;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.List;

@RestController
public class PostController {
    @Autowired
    private PostRepository repo;

    @ApiIgnore
    @RequestMapping(value="/post")
    public void redirec(HttpServletResponse response) throws IOException, IOException {
        response.sendRedirect("/swagger-ui.html");
    }

    @GetMapping("/allPosts")
    public List<Post> getAllPosts() {
        return repo.findAll();
    }


    @GetMapping("/allPosts")
    public Page<Post> getAllPosts(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repo.findAll(pageable);
    }
}