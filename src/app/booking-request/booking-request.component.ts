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

  submit() {
    const formData = this.registerForm.value;
    this.jobsOfferService.createOffer(formData).subscribe(
      () => alert('Job offer successfully created!'),
      err => alert('Error when creating a job offer: ' + err.message)
    );
    this.isSubmitted = true;
  }
}
