import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient,
              private authService: SessionService) { }

  uploadFiles(titleOfStayFile: File, identityCardFile: File, workPermitFile: File, motivationLetterFile:File): Observable<any> {
    const formData = new FormData();
    formData.append('titleOfStay', titleOfStayFile, titleOfStayFile.name);
    formData.append('identityCard', identityCardFile, identityCardFile.name);
    formData.append('workPermit', workPermitFile, workPermitFile.name);
    formData.append('motivationLetter', motivationLetterFile, motivationLetterFile.name);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`
    });
    return this.http.post(`${this.apiUrl}/uploadFiles`, formData, {headers});
  }

  uploadTitleOfStayFiles(titleOfStayFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('titleOfStay', titleOfStayFile, titleOfStayFile.name);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`
    });
    return this.http.post(`${this.apiUrl}/uploadTitleOfStayFiles`, formData, {headers});
  }

  uploadIdentityCardFiles(identityCardFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('identityCard', identityCardFile, identityCardFile.name);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`
    });
    return this.http.post(`${this.apiUrl}/uploadIdentityCardFiles`, formData, {headers});
  }

  uploadWorkPermitFiles(workPermitFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('workPermit', workPermitFile, workPermitFile.name);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`
    });
    return this.http.post(`${this.apiUrl}/uploadWorkPermitFiles`, formData, {headers});
  }

  uploadMotivationLetterFiles(motivationLetterFile:File): Observable<any> {
    const formData = new FormData();
    formData.append('cv', motivationLetterFile, motivationLetterFile.name);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorage()}`
    });
    return this.http.post(`${this.apiUrl}/uploadMotivationLetterFiles`, formData, {headers});
  }
}
