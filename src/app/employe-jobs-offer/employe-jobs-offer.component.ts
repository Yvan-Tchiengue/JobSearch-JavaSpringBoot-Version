import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SessionService} from "../shared/session.service";

@Component({
  selector: 'app-employe-jobs-offer',
  templateUrl: './employe-jobs-offer.component.html',
  styleUrls: ['./employe-jobs-offer.component.css']
})
export class EmployeJobsOfferComponent {
  jobs: any[] = [];
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient,
              private authService: SessionService) { }

  ngOnInit(): void {
  }

  getJobs(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`
    });
    this.http.get<any[]>(`${this.apiUrl}/myJobsOffer`, {headers}).subscribe((data: any[]) => {
      this.jobs = data;
    });
  }

}
