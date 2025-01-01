package com.JobSearch.backend.services;

import com.JobSearch.backend.entities.Employer;
import com.JobSearch.backend.repositories.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobSearchService {

    @Autowired
    private EmployerRepository employerRepository;

    // Exemple pour ajouter un employer
    public Employer createEmployer(Employer employer) {
        return employerRepository.save(employer);
    }

    // Autres méthodes de gestion de la base de données...
}
