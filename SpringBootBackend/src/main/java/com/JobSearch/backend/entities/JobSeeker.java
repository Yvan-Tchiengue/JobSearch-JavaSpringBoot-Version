package com.JobSearch.backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "JobSeeker")
public class JobSeeker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;
    private String cv;
    private String telephone;
    private String motivationLetter;
    private String typeOfAccount;

    // Getters and Setters
    public Long getId() {
    	return id;
    }
    
    public void setId(Long id) {
    	this.id = id;
    }
    
    public String getName() {
    	return name;
    }
    
    public void setName(String name) {
    	this.name = name;
    }
    
    public String getEmail() {
    	return name;
    }
    
    public void setEmail(String email) {
    	this.email = email;
    }
    
    public String getPassword() {
    	return name;
    }
    
    public void setPassword(String password) {
    	this.password = password;
    }
}
