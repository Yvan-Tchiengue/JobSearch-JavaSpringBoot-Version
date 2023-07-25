import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {



  constructor() { }

  setSession(token: string, userType: string): void {
    alert("le localstorage est: " +JSON.stringify(localStorage));
    localStorage.setItem('token', token);
    localStorage.setItem('userType', userType);
    alert("le localstorage apres avoir set token et usertype provenant du backend est: " +JSON.stringify(localStorage));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserType(): string | null {
    return localStorage.getItem('userType');
  }

  logOutSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  }
}
