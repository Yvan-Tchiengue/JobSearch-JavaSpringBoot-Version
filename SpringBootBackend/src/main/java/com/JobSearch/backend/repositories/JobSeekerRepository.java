package com.JobSearch.backend.repositories;
import com.JobSearch.backend.entities.JobSeeker;
import org.springframework.data.jpa.repository.JpaRepository;



public interface JobSeekerRepository extends JpaRepository<JobSeeker, Long> {
	JobSeeker findByEmail(String email);
}
