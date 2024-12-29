package com.chamara.The.Home.Services.Booking.System.repo;

import com.chamara.The.Home.Services.Booking.System.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
    User findByUsername(String username);
}
