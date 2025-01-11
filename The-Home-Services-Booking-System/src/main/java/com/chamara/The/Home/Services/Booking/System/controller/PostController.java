package com.chamara.The.Home.Services.Booking.System.controller;

import com.chamara.The.Home.Services.Booking.System.repo.PostRepository;
import com.chamara.The.Home.Services.Booking.System.model.Post;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
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
    public ResponseEntity<Map<String, String>> createPost(@RequestBody Post post) {
        repo.save(post);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Post created successfully.");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @GetMapping
    public ResponseEntity<Page<Post>> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "") String location) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Post> posts;

        if (query != null && !query.isEmpty()) {
            List<Post> searchResults = repo.findByTitleContainingOrDescriptionContainingOrLocationContaining(query, query, location);
            posts = new PageImpl<>(searchResults, pageable, searchResults.size());
        } else {
            posts = repo.findAll(pageable);
        }

        if (posts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(posts);
    }
    @DeleteMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<String> deletePost(@PathVariable String id) {
        Optional<Post> existingPost = repo.findById(id);
        if (existingPost.isPresent()) {
            repo.deleteById(id);
            return ResponseEntity.ok("{\"message\": \"Post with ID " + id + " deleted successfully.\"}");
        } else {
            return ResponseEntity.status(404).body("{\"message\": \"Post with ID " + id + " not found.\"}");
        }
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

            // Update only fields that are non-null in the incoming request
            if (updatedPost.getUserEmail() != null) post.setUserEmail(updatedPost.getUserEmail());
            if (updatedPost.getTitle() != null) post.setTitle(updatedPost.getTitle());
            if (updatedPost.getDescription() != null) post.setDescription(updatedPost.getDescription());
            if (updatedPost.getContactNo() != null) post.setContactNo(updatedPost.getContactNo());
            if (updatedPost.getCategory() != null) post.setCategory(updatedPost.getCategory());
            if (updatedPost.getLocation() != null) post.setLocation(updatedPost.getLocation());
            if (updatedPost.getWhatappLink() != null) post.setWhatappLink(updatedPost.getWhatappLink());
            if (updatedPost.getFacebookLink() != null) post.setFacebookLink(updatedPost.getFacebookLink());
            if (updatedPost.getWebsiteLink() != null) post.setWebsiteLink(updatedPost.getWebsiteLink());
            if (updatedPost.getImages() != null) post.setImages(updatedPost.getImages());

            repo.save(post);
            return ResponseEntity.ok("Post with ID " + id + " updated successfully.");
        } else {
            return ResponseEntity.status(404).body("Post with ID " + id + " not found.");
        }
    }
}