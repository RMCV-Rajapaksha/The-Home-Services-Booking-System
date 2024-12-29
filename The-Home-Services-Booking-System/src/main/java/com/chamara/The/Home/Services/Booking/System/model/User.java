package com.chamara.The.Home.Services.Booking.System.model;

import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "  ")
public class User {
    @Id
    private String id;


    private String password;
    private String username;

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +

                ", password='" + password + '\'' +
                ", username='" + username + '\'' +
                '}';
    }

    public User() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }



    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
