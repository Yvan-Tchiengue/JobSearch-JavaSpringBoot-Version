package com.JobSearch.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JobSearch.backend.dtos.CandidatureStatusResponse;
import com.JobSearch.backend.entities.Candidature;
import com.JobSearch.backend.services.CandidatureService;

@RestController
@RequestMapping("/api/candidatures")
public class CandidatureController {

    @Autowired
    private CandidatureService candidatureService;

    @GetMapping("/seeker/{jobSeekerId}")
    public List<Candidature> getCandidatures(@PathVariable Long jobSeekerId) {
        return candidatureService.getCandidaturesByJobSeekerId(jobSeekerId);
    }
    
    @PutMapping("/reject")
    public ResponseEntity<String> rejectCandidatures(@RequestBody Long jobOfferId) {
        candidatureService.updateCandidatureStatus(jobOfferId, "rejected");
        return ResponseEntity.ok("Candidatures rejected successfully");
    }
    
    @PutMapping("/accept")
    public ResponseEntity<String> acceptCandidatures(@RequestBody Long jobOfferId) {
        candidatureService.updateCandidatureStatus(jobOfferId, "accepted");
        return ResponseEntity.ok("Candidatures accepted successfully");
    }
    
    @GetMapping("/status")
    public ResponseEntity<List<CandidatureStatusResponse>> getCandidatureStatus(@RequestHeader("Authorization") String token) {
        List<CandidatureStatusResponse> responses = candidatureService.getCandidatureStatus(token);
        return ResponseEntity.ok(responses);
    }
    
    @GetMapping("/my-jobs")
    public ResponseEntity<List<Candidature>> getCandidaturesForMyJobs(@RequestHeader("Authorization") String token) {
        List<Candidature> candidatures = candidatureService.getCandidaturesForMyJobs(token);
        return ResponseEntity.ok(candidatures);
    }
    
    @PostMapping("/upload")
    public ResponseEntity<String> uploadCandidature(
            @RequestHeader("Authorization") String token,
            @RequestBody Candidature candidature) {
        candidatureService.uploadCandidature(token, candidature);
        return ResponseEntity.ok("Candidature uploaded successfully");
    }

}
