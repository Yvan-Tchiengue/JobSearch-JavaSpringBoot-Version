package com.JobSearch.backend.dtos;

public class AuthResponse {

    private String token;
    private String userType;
    private Long userID;
    private String userName;
    
    public AuthResponse(String token, String userType, Long userID, String userName) {
        this.setToken(token);
        this.setUserType(userType);
        this.setUserID(userID);
        this.setUserName(userName);
    }

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public Long getUserID() {
		return userID;
	}

	public void setUserID(Long userID) {
		this.userID = userID;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
}