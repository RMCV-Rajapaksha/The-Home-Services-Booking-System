package com.chamara.The.Home.Services.Booking.System.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;

@Document(collection = "Post")
public class Post {
    @Id
    private String id;
    private String userEmail;
    private String title;
    private String description;
    private String[] contactNo;
    private String location;
    private String whatappLink;
    private String facebookLink;
    private String websiteLink;

    // Getters and setters for all fields

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String[] getContactNo() {
        return contactNo;
    }

    public void setContactNo(String[] contactNo) {
        this.contactNo = contactNo;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getWhatappLink() {
        return whatappLink;
    }

    public void setWhatappLink(String whatappLink) {
        this.whatappLink = whatappLink;
    }

    public String getFacebookLink() {
        return facebookLink;
    }

    public void setFacebookLink(String facebookLink) {
        this.facebookLink = facebookLink;
    }

    public String getWebsiteLink() {
        return websiteLink;
    }

    public void setWebsiteLink(String websiteLink) {
        this.websiteLink = websiteLink;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id='" + id + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", contactNo=" + Arrays.toString(contactNo) +
                ", location='" + location + '\'' +
                ", whatappLink='" + whatappLink + '\'' +
                ", facebookLink='" + facebookLink + '\'' +
                ", websiteLink='" + websiteLink + '\'' +
                '}';
    }
}