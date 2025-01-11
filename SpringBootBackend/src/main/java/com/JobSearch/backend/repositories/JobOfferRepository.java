package com.JobSearch.backend.repositories;
import com.JobSearch.backend.entities.JobOffer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface JobOfferRepository extends JpaRepository<JobOffer, Long> {
	List<JobOffer> findByEmployerId(Long employerId);
}
