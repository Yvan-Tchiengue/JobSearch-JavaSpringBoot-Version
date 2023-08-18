import { Component, ChangeDetectorRef } from '@angular/core';
import {JobOfferService} from "../shared/job-offer.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SessionService} from "../shared/session.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-jobs-offer',
  templateUrl: './jobs-offer.component.html',
  styleUrls: ['./jobs-offer.component.css']
})
export class JobsOfferComponent {

  //lieu!: string;
  block: boolean = false;

  //offres: any[] = [];
  jobs: any[] = []; // Array pour stocker les offres d'emploi
  private apiUrl = 'http://localhost:3000/api'; // Remplacez ceci par l'URL de votre API backend

  constructor(private offreEmploiService: JobOfferService,
              private http: HttpClient,
              private authService: SessionService) { }

  ngOnInit(): void {
    // Vous pouvez éventuellement charger toutes les offres d'emploi au chargement de la page ici
  }

  rechercherJobs(): void {

    this.http.get<any[]>(`${this.apiUrl}/jobsOffer`).subscribe((data: any[]) => {
      //this.jobs = data;
      this.jobs = data.map(job => ({
        ...job,
        isApplied: false
      }));
      console.log(this.jobs);
    });
    // Appelez le service pour rechercher les offres d'emploi en fonction des filtres de recherche
    //this.offres = this.offreEmploiService.rechercherOffres(this.titreDuPoste, this.lieu);
    //this.cdr.detectChanges();
  }


  sendCandidature(offre: any): void{
    offre.isApplied = true;
    console.log("la candidature est:",offre);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`  // Ajoutez le token JWT à l'en-tête de la requête
    });
    console.log("le header a envoyer est:",headers);

    this.http.post(`${this.apiUrl}/upload-candidature`, offre, {headers}).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      });
  }

}
