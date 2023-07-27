import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  private apiUrl = 'https://votre-api.com'; // Remplacez ceci par l'URL de votre API backend

  constructor(private http: HttpClient) { }

  uploadFiles(titleOfStayFile: File, identityCardFile: File, workPermitFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('titleOfStay', titleOfStayFile, titleOfStayFile.name);
    formData.append('identityCard', identityCardFile, identityCardFile.name);
    formData.append('workPermit', workPermitFile, workPermitFile.name);

    // Envoyez les fichiers vers le backend pour les sauvegarder dans la base de données
    return this.http.post(`${this.apiUrl}/uploadFiles`, formData);
  }
}
