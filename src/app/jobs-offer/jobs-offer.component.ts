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

  lieu!: string;

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
      this.jobs = data;
    });
    // Appelez le service pour rechercher les offres d'emploi en fonction des filtres de recherche
    //this.offres = this.offreEmploiService.rechercherOffres(this.titreDuPoste, this.lieu);
    //this.cdr.detectChanges();
  }


  sendCandidature(offre: any[]): void{
    console.log(offre);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`  // Ajoutez le token JWT à l'en-tête de la requête
    });
    //console.log(headers);
    const tony = "je teste";

    this.http.post(`${this.apiUrl}/upload-candidature`, tony, {headers});
  }

  reduireDetails(offre: any): void {
    offre.afficherDetails = false;
    //this.cdr.detectChanges();
  }

}
