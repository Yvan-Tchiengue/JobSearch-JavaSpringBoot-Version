package com.JobSearch.backend.repositories;
import com.JobSearch.backend.entities.Candidature;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
}
