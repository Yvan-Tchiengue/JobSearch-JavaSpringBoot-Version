package com.JobSearch.backend.repositories;
import com.JobSearch.backend.entities.Employer;
import org.springframework.data.jpa.repository.JpaRepository;



public interface EmployerRepository extends JpaRepository<Employer, Long> {
}
