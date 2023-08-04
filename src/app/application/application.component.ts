import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SessionService} from "../shared/session.service";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent {

  jobs: any[] = []; // Array pour stocker les offres d'emploi
  private apiUrl = 'http://localhost:3000/api'; // Remplacez ceci par l'URL de votre API backend

  constructor(private http: HttpClient,
              private authService: SessionService) {
  }


  openCandidatures(){

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`  // Ajoutez le token JWT à l'en-tête de la requête
    });

    this.http.get<any[]>(`${this.apiUrl}/myJobsCandidatures`, {headers}).subscribe((data: any[]) => {
      this.jobs = data;
    });

  }

  acceptCandidatures(job: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`  // Ajoutez le token JWT à l'en-tête de la requête
    });

    this.http.post(`${this.apiUrl}/accept-candidatures`, job, {headers}).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      });
  }

  rejectCandidatures(job: any){
    console.log(job);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`  // Ajoutez le token JWT à l'en-tête de la requête
    });


    this.http.post(`${this.apiUrl}/reject-candidatures`, job, {headers}).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      });

  }

}
