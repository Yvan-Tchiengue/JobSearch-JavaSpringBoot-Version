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

@NgModule({
  declarations: [
    AppComponent,
    AccountCreationComponent,
    BookingRequestComponent,
    ConnectionComponent,
    DashboardComponent,
    HeaderComponent,
    RegistrationComponent
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
    FormsModule
  ],
  providers: [JobOfferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
