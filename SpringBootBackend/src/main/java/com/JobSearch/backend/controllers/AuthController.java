package com.JobSearch.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.JobSearch.backend.dtos.AuthRequest;
import com.JobSearch.backend.dtos.AuthResponse;
import com.JobSearch.backend.dtos.CreateAccountRequest;
import com.JobSearch.backend.services.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        return authService.authenticate(authRequest.getEmail(), authRequest.getPassword())
        		.map(ResponseEntity::ok)
        		.orElseGet(() -> {
                    AuthResponse errorResponse = new AuthResponse(null, null, null, "Incorrect email address or password");
                    return ResponseEntity.status(400).body(errorResponse);
                });
    }
    
    /**
     * Créer un compte utilisateur
     * @param createAccountRequest
     * @return ResponseEntity avec un message de succès ou d'erreur
     */
    @PostMapping("/create-account")
    public ResponseEntity<String> createAccount(@RequestBody CreateAccountRequest createAccountRequest) {
        String result = authService.createAccount(createAccountRequest);

        if (result.equals("Invalid account type!")) {
            return ResponseEntity.status(400).body(result); // Mauvais type de compte
        }

        return ResponseEntity.status(201).body(result); // Compte créé avec succès
    }
    
}
