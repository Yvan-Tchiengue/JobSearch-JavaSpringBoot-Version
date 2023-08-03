import { Component, OnInit } from '@angular/core';
import { JobOfferService} from "../shared/job-offer.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.css']
})
export class AccountCreationComponent {

  registerForm!: FormGroup;  // Declare registerForm here

  constructor(private jobSeekerService: JobOfferService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      namee: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      type_of_account: ['', Validators.required]
    });
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
        alert('Account created successfully!');
      },
      error => {
        //alert("malheureusement le server me renvoit l'errur suivante: "+ error + JSON.stringify(error) + JSON.stringify(this.jobSeeker));
        //alert('Account creation error: ' + error.message);
        alert('Account creation error');
      });
  }

}
