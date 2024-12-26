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
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostRepository repo;

    @ApiIgnore
    @RequestMapping(value = "/")
    public void redirect(HttpServletResponse response) throws IOException {
        response.sendRedirect("/swagger-ui.html");
    }

    @PostMapping
    public ResponseEntity<String> createPost(@RequestBody Post post) {
        repo.save(post);
        return ResponseEntity.ok("Post created successfully.");
    }

    @GetMapping
    public ResponseEntity<Page<Post>> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Post> posts = repo.findAll(pageable);
        if (posts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(posts);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable String id) {
        Optional<Post> existingPost = repo.findById(id);
        if (existingPost.isPresent()) {
            repo.deleteById(id);
            return ResponseEntity.ok("Post with ID " + id + " deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Post with ID " + id + " not found.");
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Post>> searchPosts(
            @RequestParam String query,
            @RequestParam(defaultValue = "") String location) {
        List<Post> posts = repo.findByTitleContainingOrDescriptionContainingOrLocationContaining(query, query, location);
        if (posts.isEmpty()) {
            return ResponseEntity.status(404).body(List.of()); // Empty list with 404
        }
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<Post>> getPostsByUserEmail(@PathVariable String email) {
        List<Post> posts = repo.findByUserEmail(email);
        if (posts.isEmpty()) {
            return ResponseEntity.status(404).body(List.of());
        }
        return ResponseEntity.ok(posts);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updatePost(
            @PathVariable String id,
            @RequestBody Post updatedPost) {
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
            return ResponseEntity.ok("Post with ID  updated successfully.");
        } else {
            return ResponseEntity.status(404).body("Post with ID not found.");
        }
    }
}
