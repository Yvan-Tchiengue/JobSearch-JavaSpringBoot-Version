import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import {ReactiveFormsModule} from "@angular/forms";
import { MatToolbarModule } from '@angular/material/toolbar';
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { BookingRequestComponent } from './booking-request/booking-request.component';
import { ConnectionComponent } from './connection/connection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './registration/registration.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { JobsOfferComponent } from './jobs-offer/jobs-offer.component';
import { JobsConfirmationComponent } from './jobs-confirmation/jobs-confirmation.component';
import { ProfilComponent } from './profil/profil.component';
import { JobSubmitionComponent } from './job-submition/job-submition.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { EmployeJobsOfferComponent } from './employe-jobs-offer/employe-jobs-offer.component';
import { ApplicationComponent } from './application/application.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

import { JobOfferService} from "./shared/job-offer.service";



@NgModule({
  declarations: [
    AppComponent,
    AccountCreationComponent,
    BookingRequestComponent,
    ConnectionComponent,
    DashboardComponent,
    RegistrationComponent,
    HeaderComponent,
    SidenavComponent,
    JobsOfferComponent,
    JobsConfirmationComponent,
    ProfilComponent,
    JobSubmitionComponent,
    CandidatureComponent,
    EmployeJobsOfferComponent,
    ApplicationComponent,
    HomeComponent,
    FooterComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule
  ],
  providers: [JobOfferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
