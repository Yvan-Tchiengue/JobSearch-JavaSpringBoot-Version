package com.JobSearch.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.JobSearch.backend.dtos.CreateJobOfferRequest;
import com.JobSearch.backend.entities.Employer;
import com.JobSearch.backend.entities.JobOffer;
import com.JobSearch.backend.repositories.EmployerRepository;
import com.JobSearch.backend.repositories.JobOfferRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JobOfferService {


    @Autowired
    private JobOfferRepository jobOfferRepository;

    @Autowired
    private EmployerRepository employerRepository;

    private final String jwtSecret = "tony"; //utiliser une clé secrète sûre dans un fichier de configuration

    /**
     * Créer une offre d'emploi
     * @param createJobOfferRequest
     * @param token
     * @return
     */
    public String createJobOffer(CreateJobOfferRequest createJobOfferRequest, String token) {
        // Extraire l'ID de l'employeur à partir du token JWT
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();

        Long employerId = Long.parseLong(claims.get("userID").toString());

        // Vérifier si l'employeur existe
        Employer employer = employerRepository.findById(employerId).orElse(null);
        if (employer == null) {
            return "Employer not found";
        }

        // Créer une nouvelle offre d'emploi
        JobOffer jobOffer = new JobOffer();
        jobOffer.setEmployer(employer);
        jobOffer.setTitle(createJobOfferRequest.getTitle());
        jobOffer.setDescription(createJobOfferRequest.getDescription());
        jobOffer.setLocation(createJobOfferRequest.getLocation());

        // Sauvegarder l'offre d'emploi dans la base de données
        jobOfferRepository.save(jobOffer);

        return "Job offer created successfully!";
    }

    public List<JobOffer> getAllJobOffers(){
    	return jobOfferRepository.findAll();
    }
    
    public List<JobOffer> getJobOffersbyEmployer(Long employerId){
    	return jobOfferRepository.findByEmployerId(employerId);
    }
}
