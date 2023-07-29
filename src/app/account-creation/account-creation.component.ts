import { Component, OnInit } from '@angular/core';
import { JobOfferService} from "../shared/job-offer.service";


@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.css']
})
export class AccountCreationComponent {


  constructor(private jobSeekerService: JobOfferService) { }

  ngOnInit(): void {
  }

  jobSeeker = {
    namee: '',
    email: '',
    password: '',
    type_of_account: ''
  };

  submit() {
    //alert("les données a soumettre au serveur sont:" + JSON.stringify(this.jobSeeker));
    this.jobSeekerService.creerCompte(this.jobSeeker).subscribe(
      response => {
        //alert("la reponse du server est: " + response + JSON.stringify(response));
        alert('Compte créé avec succès!');
      },
      error => {
        //alert("malheureusement le server me renvoit l'errur suivante: "+ error + JSON.stringify(error) + JSON.stringify(this.jobSeeker));
        alert('Erreur lors de la création du compte: ' + error.message);
      });
  }

}
