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

  jobs: any[] = [];
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient,
              private authService: SessionService) {
  }

  openCandidatures(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`
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
      },
      error => {
      });
  }

  rejectCandidatures(job: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`
    });
    this.http.post(`${this.apiUrl}/reject-candidatures`, job, {headers}).subscribe(
      response => {
      },
      error => {
      });
  }

  idCardDownload(job: any) {
    const jobseek = job.jobSeekerId;
    const url = `assets/identitycard${jobseek}.pdf`;
    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      saveAs(blob, `identitycard_${jobseek}.pdf`);
    });
  }

  workPermitDownload(job: any) {
    const jobseek = job.jobSeekerId;
    const url = `assets/workpermit${jobseek}.pdf`;
    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      saveAs(blob, `workpermit_${jobseek}.pdf`);
    });
  }
  cvDownload(job: any) {
    const jobseek = job.jobSeekerId;
    const url = `assets/cv${jobseek}.pdf`;
    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      saveAs(blob, `cv_${jobseek}.pdf`);
    });
  }
  titleOfStayDownload(job: any) {
    const jobseek = job.jobSeekerId;
    const url = `assets/titleofstay${jobseek}.pdf`;
    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      saveAs(blob, `titleofstay_${jobseek}.pdf`);
    });
  }
}
