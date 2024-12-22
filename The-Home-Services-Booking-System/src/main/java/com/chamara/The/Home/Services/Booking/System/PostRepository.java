package com.chamara.The.Home.Services.Booking.System;

import com.chamara.The.Home.Services.Booking.System.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String>{

}
