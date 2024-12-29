package com.chamara.The.Home.Services.Booking.System.repo;

import com.chamara.The.Home.Services.Booking.System.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {


    List<Comment> findByPostId(String postId);
}
