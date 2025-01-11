package com.JobSearch.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.JobSearch.backend.entities.JobOffer;
import com.JobSearch.backend.repositories.JobOfferRepository;

public class JobService {

    @Autowired
    private JobOfferRepository jobOfferRepository;

    public JobOffer createJobOffer(JobOffer jobOffer) {
        return jobOfferRepository.save(jobOffer);
    }

    public List<JobOffer> getAllJobOffers() {
        return jobOfferRepository.findAll();
    }

    public List<JobOffer> getJobOffersByEmployer(Long employerId) {
        return jobOfferRepository.findByEmployerId(employerId);
    }

}
