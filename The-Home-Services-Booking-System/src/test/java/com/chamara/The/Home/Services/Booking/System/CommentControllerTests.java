package com.chamara.The.Home.Services.Booking.System;

import com.chamara.The.Home.Services.Booking.System.controller.CommentController;
import com.chamara.The.Home.Services.Booking.System.model.Comment;
import com.chamara.The.Home.Services.Booking.System.repo.CommentRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

public class CommentControllerTests {

    private final CommentRepository repo = Mockito.mock(CommentRepository.class);
    private final CommentController controller = new CommentController(repo);

    @Test
    void testCreateComment() {
        Comment comment = new Comment();
        when(repo.save(any(Comment.class))).thenReturn(comment);

        ResponseEntity<String> response = controller.createComment(comment);
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void testGetAllComments() {
        when(repo.findAll()).thenReturn(Collections.emptyList());

        List<Comment> comments = controller.getAllComments();
        assertEquals(0, comments.size());
    }

    @Test
    void testDeleteComment() {
        when(repo.existsById(anyString())).thenReturn(true);
        ResponseEntity<String> response = controller.deleteComment("1");
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void testGetCommentsByPostId() {
        when(repo.findByPostId(anyString())).thenReturn(Collections.emptyList());
        ResponseEntity<List<Comment>> response = controller.getCommentsByPostId("1");
        assertEquals(204, response.getStatusCodeValue());
    }
}