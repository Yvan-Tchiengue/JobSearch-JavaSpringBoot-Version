package com.JobSearch.backend.entities;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class JobOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private Float salary;
    private Date publicationDate;
    private String location;
    private String typeContract;
    private String businessSector;

    @ManyToOne
    @JoinColumn(name = "employerId", nullable = false)
    private Employer employer;

    // Getters and Setters
}
