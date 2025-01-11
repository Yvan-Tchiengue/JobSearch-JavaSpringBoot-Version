package com.JobSearch.backend.entities;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Candidature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "jobSeekerId", nullable = false)
    private JobSeeker jobSeeker;

    @ManyToOne
    @JoinColumn(name = "jobOfferId", nullable = false)
    private JobOffer jobOffer;
    
    private Date dateCandidature;
    
    private String confirmation;

    public Long getId() {
    	return id;
    }
    public void setId(Long id) {
    	this.id = id;
    }
    public JobSeeker getJobSeeker() {
    	return jobSeeker;
    }
    public void setJobSeeker(JobSeeker jobSeeker) {
    	this.jobSeeker = jobSeeker;
    }
    public JobOffer getJobOffer() {
    	return jobOffer;
    }
    public void setJobOffer(JobOffer jobOffer) {
    	this.jobOffer = jobOffer;
    }
	public Date getDateCandidature() {
		return dateCandidature;
	}

	public void setDateCandidature(Date dateCandidature) {
		this.dateCandidature = dateCandidature;
	}

	public String getConfirmation() {
		return confirmation;
	}

	public void setConfirmation(String confirmation) {
		this.confirmation = confirmation;
	}
	
	public Long getJobSeekerId() {
		return jobSeeker != null ? jobSeeker.getId() : null;
	}
	
	public void setJobSeekerId(Long jobSeekerId) {
		if(this.jobSeeker == null) {
			this.jobSeeker = new JobSeeker();
		}
		this.jobSeeker = new JobSeeker();
	}
	
	   public Long getJobOfferId() {
	        return jobOffer != null ? jobOffer.getId() : null;
	    }

}
