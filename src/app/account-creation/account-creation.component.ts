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
      password: ['',  [Validators.required, Validators.minLength(8)]],
      type_of_account: ['', Validators.required]
    });
  }

  submit() {
    const formData = this.registerForm.value;
    this.jobSeekerService.creerCompte(formData).subscribe(
      response => {
        alert('Account created successfully!');
      },
      error => {
        alert('Account creation error');
      }
    );
  }

}
