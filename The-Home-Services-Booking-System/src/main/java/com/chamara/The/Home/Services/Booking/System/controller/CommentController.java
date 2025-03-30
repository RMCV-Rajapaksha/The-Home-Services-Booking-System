package com.chamara.The.Home.Services.Booking.System.controller;

import com.chamara.The.Home.Services.Booking.System.repo.CommentRepository;
import com.chamara.The.Home.Services.Booking.System.model.Comment;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentRepository repo;

    public CommentController(CommentRepository repo) {
        this.repo = repo;
    }

    @ApiIgnore
    @RequestMapping(value = "/", produces = "application/json")
    public void redirect(HttpServletResponse response) throws IOException {
        response.sendRedirect("/swagger-ui.html");
    }

    @PostMapping(produces = "application/json")
    public ResponseEntity<String> createComment(@RequestBody Comment comment) {
        repo.save(comment);
        return ResponseEntity.ok("{\"message\": \"Comment created successfully.\"}");
    }

    @GetMapping(produces = "application/json")
    public List<Comment> getAllComments() {
        return repo.findAll();
    }

    @DeleteMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<String> deleteComment(@PathVariable String id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.ok("{\"message\": \"Comment deleted successfully.\"}");
        } else {
            return ResponseEntity.status(404).body("{\"message\": \"Comment not found.\"}");
        }
    }

    @GetMapping(value = "/post/{postId}", produces = "application/json")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable String postId) {
        List<Comment> comments = repo.findByPostId(postId);
        if (comments.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(comments);
        }
    }
}