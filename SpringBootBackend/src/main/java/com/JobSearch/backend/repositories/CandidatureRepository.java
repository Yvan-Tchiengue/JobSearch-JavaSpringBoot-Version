package com.JobSearch.backend.repositories;
import com.JobSearch.backend.entities.Candidature;
import com.JobSearch.backend.entities.JobSeeker;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
	List<Candidature> findbyJobOfferId(Long jobOfferId);
	
	List<Candidature> findbyJobSeekerId(Long jobSeekerId);
	
	List<Candidature> findbyEmployerId(Long employerId);
}
