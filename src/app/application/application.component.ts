import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SessionService} from "../shared/session.service";
import { saveAs } from 'file-saver';

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
      console.log(data);
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

  idCardDownload(job: any) {

    console.log("verification du fichier ",job);
    const jobseek = job.jobSeekerId;
    const url = `assets/identitycard${jobseek}.pdf`; // Utilisez les backticks ici

    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      saveAs(blob, `identitycard_${jobseek}.pdf`); // Le fichier sera téléchargé avec ce nom
    });
  }

  workPermitDownload(job: any) {

    console.log("verification du fichier ",job);
    const jobseek = job.jobSeekerId;
    const url = `assets/workpermit${jobseek}.pdf`; // Utilisez les backticks ici

    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      saveAs(blob, `workpermit_${jobseek}.pdf`); // Le fichier sera téléchargé avec ce nom
    });
  }
  cvDownload(job: any) {

    console.log("verification du fichier ",job);
    const jobseek = job.jobSeekerId;
    const url = `assets/cv${jobseek}.pdf`; // Utilisez les backticks ici

    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      saveAs(blob, `cv_${jobseek}.pdf`); // Le fichier sera téléchargé avec ce nom
    });
  }
  titleOfStayDownload(job: any) {

    console.log("verification du fichier ",job);
    const jobseek = job.jobSeekerId;
    const url = `assets/titleofstay${jobseek}.pdf`; // Utilisez les backticks ici

    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      saveAs(blob, `titleofstay_${jobseek}.pdf`); // Le fichier sera téléchargé avec ce nom
    });
  }

}
