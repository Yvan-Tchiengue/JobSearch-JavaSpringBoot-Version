import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {

  private apiUrl = 'http://localhost:3000/api'; // Remplacez ceci par l'URL de votre API backend

// Simulez les données des offres d'emploi (vous pouvez les récupérer depuis la base de données ici)
  private offres: any[] = [
    { titre: 'Développeur Web', lieu: 'Paris', avis_favorable: true, description: '...', afficherDetails: false },
    { titre: 'Designer Graphique', lieu: 'Lyon', avis_favorable: false, description: '...', afficherDetails: false },
    // Ajoutez d'autres offres d'emploi ici
  ];

  constructor(private http: HttpClient,
              private sessionService: SessionService,
              private authService: SessionService) {
  }

  creerOffre(offreEmploi: any): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`  // Ajoutez le token JWT à l'en-tête de la requête
    });
    return this.http.post(`${this.apiUrl}/booking-request`, offreEmploi, {headers});
  }

  creerCompte(rechercheurEmploi: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/account-creating', rechercheurEmploi);
  }

  authentification(credentials: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/authentification', credentials);
  }

  rechercherOffres(titreDuPoste: string, lieu: string): any[] {
    // Appliquez ici la logique de recherche en fonction des filtres de recherche (titreDuPoste et lieu)
    // Par exemple, filtrez les offres en fonction des valeurs des filtres

    // Pour cet exemple, nous renvoyons simplement toutes les offres
    return this.offres;
  }

  getOffresFavorables(): any[] {
    // Appliquez ici la logique pour récupérer les offres d'emploi avec un avis favorable pour l'utilisateur
    return this.offres.filter(offre => offre.avis_favorable === true);
  }

}
