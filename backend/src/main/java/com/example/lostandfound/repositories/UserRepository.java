package com.example.lostandfound.repositories;

import com.example.lostandfound.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    // Custom method to find a user by their email during login
    Optional<User> findByEmail(String email);
}