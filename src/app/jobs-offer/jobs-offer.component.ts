import { Component, ChangeDetectorRef } from '@angular/core';
import {JobOfferService} from "../shared/job-offer.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SessionService} from "../shared/session.service";

@Component({
  selector: 'app-jobs-offer',
  templateUrl: './jobs-offer.component.html',
  styleUrls: ['./jobs-offer.component.css']
})
export class JobsOfferComponent {
  block: boolean = false;
  jobs: any[] = [];
  private apiUrl = 'http://localhost:3000/api';

  constructor(private offreEmploiService: JobOfferService,
              private http: HttpClient,
              private authService: SessionService) { }

  ngOnInit(): void {
  }

  findJobs(): void {
    this.http.get<any[]>(`${this.apiUrl}/jobsOffer`).subscribe((data: any[]) => {
      this.jobs = data.map(job => ({
        ...job,
        isApplied: false
      }));
      console.log(this.jobs);
    });
  }


  sendCandidature(offre: any): void{
    offre.isApplied = true;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`
    });
    this.http.post(`${this.apiUrl}/upload-candidature`, offre, {headers}).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      });
  }

}
