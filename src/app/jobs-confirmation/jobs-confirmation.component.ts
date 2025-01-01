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
  confirmationRejected = "";
  confirmationAccepted = "";
  confirmationStatus = "";
  jobs: any[] = [];
  private apiUrl = 'http://localhost:3000/api';

  constructor(private offreEmploiService: JobOfferService,
              private authService: SessionService,
              private http: HttpClient) { }

  ngOnInit(): void {
  }

  seeConfirmation(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`
    });
    this.http.get<any[]>(`${this.apiUrl}/see-confirmation`,{headers} ).subscribe((data: any[]) => {
      this.jobs = data;
      this.jobs.map(job => {
        job.confirmationStatus = job.confirmation;
      });
    });
  }
}
