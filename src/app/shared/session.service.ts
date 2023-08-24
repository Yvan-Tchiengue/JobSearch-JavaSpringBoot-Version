import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() { }

  setSession(token: string, userType: string, userID: string, userName: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userType', userType);
    localStorage.setItem('userID', userID);
    localStorage.setItem('userName', userName);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  getUserType(): string | null {
    return localStorage.getItem('userType');
  }

  getUserID(): string | null{
    return localStorage.getItem('userID');
  }

  getLocalStorage(): string | null{
    return JSON.stringify(localStorage);
  }

  logOutSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
  }
}
