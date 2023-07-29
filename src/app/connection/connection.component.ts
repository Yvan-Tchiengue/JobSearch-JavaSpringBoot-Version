import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobOfferService} from "../shared/job-offer.service";
import {SessionService} from "../shared/session.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {

  reponse?: number;
  constructor(private http: HttpClient,
              private authService: JobOfferService,
              private sessionService: SessionService,
              private router: Router) { }

  ngOnInit(): void {
  }

  credentials = {
    email: '',
    password: ''
  };

  submit() {
    //alert("les credentials a envoyer au serveur sont: " +JSON.stringify(this.credentials));
    this.authService.authentification(this.credentials).subscribe(
      response => {
        //alert("la reponse du server est: " +JSON.stringify(response));
        this.sessionService.setSession(response.token, response.userType, response.userID);
        //alert('Authentification réussie!' +JSON.stringify(response));
        this.router.navigate(['/dashboard']);
      },
      err => alert('Erreur lors de l\'authentification: ' + err.error.error + JSON.stringify(err))
    );
  }

  /*demanderCalcul() {
    const url = 'http://localhost:3000/api/calcul'; // Remplacez l'URL par celle de votre serveur Node.js

    this.http.get<number>(url).subscribe(
      (resultat) => {
        this.reponse = resultat;
      },
      (erreur) => {
        console.error('Une erreur s\'est produite lors de la demande de calcul :', erreur);
      }
    );
  }*/

}
