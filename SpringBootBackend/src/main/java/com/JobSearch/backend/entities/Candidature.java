package com.JobSearch.backend.entities;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Candidature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date dateCandidature;

    @ManyToOne
    @JoinColumn(name = "jobSeekerId", nullable = false)
    private JobSeeker jobSeeker;

    @ManyToOne
    @JoinColumn(name = "jobOfferId", nullable = false)
    private JobOffer jobOffer;

    // Getters and Setters
}
