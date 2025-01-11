package com.JobSearch.backend.repositories;
import com.JobSearch.backend.entities.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface EmployerRepository extends JpaRepository<Employer, Long> {
	Employer findByEmail(String email);
}
