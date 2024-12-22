package com.chamara.The.Home.Services.Booking.System.controller;

import com.chamara.The.Home.Services.Booking.System.PostRepository;
import com.chamara.The.Home.Services.Booking.System.model.Post;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.Optional;

@RestController
public class PostController {
    @Autowired
    private PostRepository repo;

    @ApiIgnore
    @RequestMapping(value = "/post")
    public void redirect(HttpServletResponse response) throws IOException {
        response.sendRedirect("/swagger-ui.html");
    }

    @PostMapping("/posts")
    public Post createPost(@RequestBody Post post) {
        return repo.save(post);
    }

    @GetMapping("/allPosts")
    public Page<Post> getAllPosts(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repo.findAll(pageable);
    }

    @DeleteMapping("/posts/{id}")
    public ResponseEntity<String> deletePost(@PathVariable String id) {
        Optional<Post> existingPost = repo.findById(id);
        if (existingPost.isPresent()) {
            repo.deleteById(id);
            return ResponseEntity.ok("Post deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Post not found.");
        }
    }
    @PutMapping("/posts/{id}")
    public ResponseEntity<String> updatePost(@PathVariable String id, @RequestBody Post updatedPost) {
        Optional<Post> existingPost = repo.findById(id);
        if (existingPost.isPresent()) {
            Post post = existingPost.get();
            post.setUserEmail(updatedPost.getUserEmail());
            post.setTitle(updatedPost.getTitle());
            post.setDescription(updatedPost.getDescription());
            post.setContactNo(updatedPost.getContactNo());
            post.setLocation(updatedPost.getLocation());
            post.setWhatappLink(updatedPost.getWhatappLink());
            post.setFacebookLink(updatedPost.getFacebookLink());
            post.setWebsiteLink(updatedPost.getWebsiteLink());

            repo.save(post);
            return ResponseEntity.ok("Post updated successfully.");
        } else {
            return ResponseEntity.status(404).body("Post not found.");
        }
    }
}
