package com.JobSearch.backend.services;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JobSearch.backend.dtos.AuthResponse;
import com.JobSearch.backend.dtos.CreateAccountRequest;
import com.JobSearch.backend.entities.Employer;
import com.JobSearch.backend.entities.JobSeeker;
import com.JobSearch.backend.repositories.EmployerRepository;
import com.JobSearch.backend.repositories.JobSeekerRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private JobSeekerRepository jobSeekerRepository;
    @Autowired
    private EmployerRepository employerRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    private final String jwtSecret = "tony";
    private final long jwtExpirationMs = 86400000; // 24 hours
    
    public Optional<AuthResponse> authenticate(String email, String password) {
        
    	// check Jobseeker
    	JobSeeker jobSeeker = jobSeekerRepository.findByEmail(email); 
        if (jobSeeker != null && passwordEncoder.matches(password, jobSeeker.getPassword())) {
            String token = generateToken(jobSeeker.getId(), "jobSeeker");
        	return Optional.of(new AuthResponse(token, "JobSeeker", jobSeeker.getId(), jobSeeker.getName()));
        }

        //check Employer
        Employer employer = employerRepository.findByEmail(email);
        if (employer != null && passwordEncoder.matches(password, employer.getPassword())) {
            String token = generateToken(employer.getId(), "Employer");
        	return Optional.of(new AuthResponse(token, "Employer", employer.getId(), employer.getNamee()));
        }

     return Optional.empty();
        
    }
    
    /**
     * Crée un compte utilisateur dans la base de données
     * @param request
     * @return
     */
    public String createAccount(CreateAccountRequest request) {
        // Hacher le mot de passe
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        // Créer l'utilisateur selon le type de compte
        if (request.getTypeOfAccount().equalsIgnoreCase("jobseeker")) {
            JobSeeker jobSeeker = new JobSeeker();
            jobSeeker.setEmail(request.getEmail());
            jobSeeker.setPassword(hashedPassword);
            jobSeeker.setName(request.getName());
            jobSeekerRepository.save(jobSeeker);
            return "JobSeeker account created successfully!";
        } else if (request.getTypeOfAccount().equalsIgnoreCase("employer")) {
            Employer employer = new Employer();
            employer.setEmail(request.getEmail());
            employer.setPassword(hashedPassword);
            employer.setNamee(request.getName());
            employerRepository.save(employer);
            return "Employer account created successfully!";
        } else {
            return "Invalid account type!";
        }
    }
    
    private String generateToken(Long userId, String userType) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .claim("type", userType)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }
}
