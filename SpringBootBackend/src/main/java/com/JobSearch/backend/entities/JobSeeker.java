package com.JobSearch.backend.entities;

import jakarta.persistence.*;

@Entity
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
}
