package com.JobSearch.backend.entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Employer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String namee;
    private String adress;
    private String email;
    private String telephone;
    private String typeOfAccount;
    private String password;

    @OneToMany(mappedBy = "employer")
    private List<JobOffer> jobOffers;

    // Getters and Setters
}
