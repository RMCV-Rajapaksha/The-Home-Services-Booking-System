package com.chamara.The.Home.Services.Booking.System;

import com.chamara.The.Home.Services.Booking.System.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post, String>{

    List<Post> findByTitleContainingOrDescriptionContainingOrLocationContaining(String query, String query1, String location);

    List<Post> findByUserEmail(String email);
}
