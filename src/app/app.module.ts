import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { BookingRequestComponent } from './booking-request/booking-request.component';
import { ConnectionComponent } from './connection/connection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './registration/registration.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import {ReactiveFormsModule} from "@angular/forms";
import { MatToolbarModule } from '@angular/material/toolbar';
import {HttpClientModule} from "@angular/common/http";

import { FormsModule } from '@angular/forms';
import { JobOfferService} from "./shared/job-offer.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { JobsOfferComponent } from './jobs-offer/jobs-offer.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { JobsConfirmationComponent } from './jobs-confirmation/jobs-confirmation.component';
import { ProfilComponent } from './profil/profil.component';
import { JobSubmitionComponent } from './job-submition/job-submition.component';
import { CandidatureComponent } from './candidature/candidature.component';

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
    CandidatureComponent
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
    MatFormFieldModule
  ],
  providers: [JobOfferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
