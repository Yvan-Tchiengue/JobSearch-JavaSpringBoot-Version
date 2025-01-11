package com.JobSearch.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JobSearch.backend.dtos.CreateJobOfferRequest;
import com.JobSearch.backend.entities.JobOffer;
import com.JobSearch.backend.services.JobOfferService;
import com.JobSearch.backend.services.JobService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/jobs")
public class JobOfferController {


    @Autowired
    private JobOfferService jobOfferService;

    /**
     * Créer une nouvelle offre d'emploi
     * @param createJobOfferRequest
     * @param request
     * @return ResponseEntity avec un message de succès ou d'erreur
     */
    @PostMapping("/create")
    public ResponseEntity<String> createJobOffer(
            @RequestBody CreateJobOfferRequest createJobOfferRequest,
            HttpServletRequest request) {
        
        // Extraire le token JWT du header "Authorization"
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            String token = bearerToken.substring(7); // Retirer le "Bearer " du token
            String result = jobOfferService.createJobOffer(createJobOfferRequest, token);
            
            if (result.equals("Employer not found")) {
                return ResponseEntity.status(400).body(result);
            }

            return ResponseEntity.status(201).body(result);
        } else {
            return ResponseEntity.status(401).body("Authorization token is missing or invalid");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<JobOffer>> getAllJobOffers() {
    	List<JobOffer> jobOffers = jobOfferService.getAllJobOffers();
        return ResponseEntity.ok(jobOffers);
    }

    @GetMapping("/my-offers/{employerId}")
    public ResponseEntity<List<JobOffer>> getJobsByEmployer(@PathVariable Long employerId) {
        List<JobOffer> jobOffers = jobOfferService.getJobOffersbyEmployer(employerId);
    	return ResponseEntity.ok(jobOffers);
    }
}
