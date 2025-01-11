package com.JobSearch.backend.dtos;

public class CandidatureStatusResponse {

    private String title;
    private String description;
    private String location;
    private String confirmation;

    public CandidatureStatusResponse(String title, String description, String location, String confirmation) {
        this.setTitle(title);
        this.setDescription(description);
        this.setLocation(location);
        this.setConfirmation(confirmation);
    }

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getConfirmation() {
		return confirmation;
	}

	public void setConfirmation(String confirmation) {
		this.confirmation = confirmation;
	}

}
