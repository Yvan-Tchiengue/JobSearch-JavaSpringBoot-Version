import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobOfferService} from "../shared/job-offer.service";
import {SessionService} from "../shared/session.service";
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {
  registerForm!: FormGroup;
  reponse?: number;
  isSubmitted = false;
  constructor(private http: HttpClient,
              private authService: JobOfferService,
              private sessionService: SessionService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',  [Validators.required, Validators.minLength(8)]]
    });
  }

  submit() {
    const formData = this.registerForm.value;
    this.authService.authentification(formData).subscribe(
      response => {
        this.sessionService.setSession(response.token, response.userType, response.userID, response.userName);
        this.router.navigate(['/dashboard']);
      },
        err => {
        const errorMessage = 'Authentication error:: ' + err.error.error + JSON.stringify(err);
        alert(errorMessage);
      }
    );
    this.isSubmitted = true;
  }
}
