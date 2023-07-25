import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {



  constructor(private http: HttpClient, private sessionService: SessionService) {
  }

  creerOffre(offreEmploi: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/offres-emploi', offreEmploi);
  }

  creerCompte(rechercheurEmploi: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/account-creating', rechercheurEmploi);
  }

  authentification(credentials: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/authentification', credentials);
  }

}
