import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {

  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient,
              private sessionService: SessionService,
              private authService: SessionService) {
  }

  createOffer(joboffer: any): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`
    });
    return this.http.post(`${this.apiUrl}/booking-request`, joboffer, {headers});
  }

  createAccount(jobseeker: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/account-creating`, jobseeker);
  }

  authentification(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/authentification`, credentials);
  }

}
