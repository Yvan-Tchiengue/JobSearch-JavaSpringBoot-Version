package com.JobSearch.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JobSearch.backend.dtos.CandidatureStatusResponse;
import com.JobSearch.backend.entities.Candidature;
import com.JobSearch.backend.repositories.CandidatureRepository;
import com.JobSearch.backend.repositories.JobOfferRepository;

@Service
public class CandidatureService {

    @Autowired
    private CandidatureRepository candidatureRepository;
    
    private JobOfferRepository jobOfferRepository;

    public List<Candidature> getCandidaturesByJobSeekerId(Long jobSeekerId) {
        return candidatureRepository.findbyJobSeekerId(jobSeekerId);
    }
    
    public void updateCandidatureStatus(Long jobOfferId, String status) {
        List<Candidature> candidatures = candidatureRepository.findbyJobOfferId(jobOfferId);
        for (Candidature candidature : candidatures) {
            candidature.setConfirmation(status);
        }
        candidatureRepository.saveAll(candidatures);
    }
    
    public List<CandidatureStatusResponse> getCandidatureStatus(String token) {
        Long jobSeekerId = extractUserIdFromToken(token);
        List<Candidature> candidatures = candidatureRepository.findbyJobSeekerId(jobSeekerId);

        return candidatures.stream().map(candidature -> {
            var jobOffer = jobOfferRepository.findById(candidature.getJobOffer().getId()).orElseThrow();
            return new CandidatureStatusResponse(
                    jobOffer.getTitle(),
                    jobOffer.getDescription(),
                    jobOffer.getLocation(),
                    candidature.getConfirmation()
            );
        }).collect(Collectors.toList());
    }
    
    public List<Candidature> getCandidaturesForMyJobs(String token) {
        Long employerId = extractUserIdFromToken(token);
        return candidatureRepository.findbyEmployerId(employerId);
    }

    public void uploadCandidature(String token, Candidature candidature) {
        Long jobSeekerId = extractUserIdFromToken(token);
        candidature.setJobSeekerId(jobSeekerId);
        candidatureRepository.save(candidature);
    }
    
    private Long extractUserIdFromToken(String token) {
        // Implémentation pour extraire l'utilisateur à partir du token
        // (p. ex., JWT decode ou extraction JSON)
        return Long.parseLong(token); // Exemple simplifié
    }

}
