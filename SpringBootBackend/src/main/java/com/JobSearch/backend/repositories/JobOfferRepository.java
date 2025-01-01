package com.JobSearch.backend.repositories;
import com.JobSearch.backend.entities.JobOffer;
import org.springframework.data.jpa.repository.JpaRepository;


public interface JobOfferRepository extends JpaRepository<JobOffer, Long> {
}
