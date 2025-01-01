package com.JobSearch.backend.controllers;
import com.JobSearch.backend.entities.Employer;
import com.JobSearch.backend.services.JobSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employers")
public class EmployerController {

    @Autowired
    private JobSearchService jobSearchService;

    @PostMapping
    public Employer createEmployer(@RequestBody Employer employer) {
        return jobSearchService.createEmployer(employer);
    }

    // Autres endpoints pour les employeurs
}
