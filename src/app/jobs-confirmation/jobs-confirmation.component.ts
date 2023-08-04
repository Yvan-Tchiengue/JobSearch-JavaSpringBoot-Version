import { Component } from '@angular/core';
import {JobOfferService} from "../shared/job-offer.service";
import {SessionService} from "../shared/session.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-jobs-confirmation',
  templateUrl: './jobs-confirmation.component.html',
  styleUrls: ['./jobs-confirmation.component.css']
})
export class JobsConfirmationComponent {

  offresFavorables: any[] = [];
  confirmationRejected = "";
  confirmationAccepted = "";
  confirmationStatus = "";
  jobs: any[] = []; // Array pour stocker les offres d'emploi
  private apiUrl = 'http://localhost:3000/api'; // Remplacez ceci par l'URL de votre API backend

  constructor(private offreEmploiService: JobOfferService,
              private authService: SessionService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.rechercherOffresFavorables();
  }

  rechercherOffresFavorables(): void {
    // Appelez le service pour récupérer les offres d'emploi avec un avis favorable pour l'utilisateur
    this.offresFavorables = this.offreEmploiService.getOffresFavorables();
  }

  seeConfirmation(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`  // Ajoutez le token JWT à l'en-tête de la requête
    });

    this.http.get<any[]>(`${this.apiUrl}/see-confirmation`,{headers} ).subscribe((data: any[]) => {
      this.jobs = data;
      console.log('see confirmation',this.jobs);
      // Accéder à la valeur de confirmation pour chaque objet dans le tableau
      this.jobs.map(job => {
        console.log('Job confirmation:', job.confirmation);
        job.confirmationStatus = job.confirmation;
      });
    });

  }
}
