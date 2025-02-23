package com.chamara.The.Home.Services.Booking.System;

import com.chamara.The.Home.Services.Booking.System.controller.PostController;
import com.chamara.The.Home.Services.Booking.System.model.Post;
import com.chamara.The.Home.Services.Booking.System.repo.PostRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

public class PostControllerTests {

    private final PostRepository repo = Mockito.mock(PostRepository.class);
    private final PostController controller = new PostController(repo);

    @Test
    void testCreatePost() {
        Post post = new Post();
        when(repo.save(any(Post.class))).thenReturn(post);

        ResponseEntity<Map<String, String>> response = controller.createPost(post);
        assertEquals(201, response.getStatusCodeValue());
    }

    @Test
    void testGetAllPosts() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Post> page = new PageImpl<>(Collections.emptyList(), pageable, 0);
        when(repo.findAll(pageable)).thenReturn(page);

        ResponseEntity<Page<Post>> response = controller.getAllPosts(0, 10, null, "");
        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    void testDeletePost() {
        when(repo.findById(anyString())).thenReturn(Optional.of(new Post()));
        ResponseEntity<String> response = controller.deletePost("1");
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void testGetPostById() {
        when(repo.findById(anyString())).thenReturn(Optional.of(new Post()));
        ResponseEntity<Post> response = controller.getPostById("1");
        assertEquals(200, response.getStatusCodeValue());
    }
}