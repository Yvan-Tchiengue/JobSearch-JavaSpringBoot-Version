import { Component, OnInit } from '@angular/core';
import { JobOfferService} from "../shared/job-offer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-booking-request',
  templateUrl: './booking-request.component.html',
  styleUrls: ['./booking-request.component.css']
})
export class BookingRequestComponent {
  registerForm!: FormGroup;
  isSubmitted = false;

  constructor(private jobsOfferService: JobOfferService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['',  Validators.required]
    });
  }

  /*jobsOffer = {
    title: '',
    description: '',
    location: ''
  };*/

  submit() {
    const formData = this.registerForm.value;
    this.jobsOfferService.creerOffre(formData).subscribe(
      () => alert('Offre d\'emploi créée avec succès!'),
      err => alert('Erreur lors de la création de l\'offre d\'emploi: ' + err.message)
    );
    this.isSubmitted = true;
  }

}
