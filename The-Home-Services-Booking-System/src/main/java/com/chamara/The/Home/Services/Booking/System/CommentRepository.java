package com.chamara.The.Home.Services.Booking.System;

import com.chamara.The.Home.Services.Booking.System.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment, String> {


}
