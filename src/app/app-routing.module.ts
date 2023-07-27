import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountCreationComponent} from "./account-creation/account-creation.component";
import {BookingRequestComponent} from "./booking-request/booking-request.component";
import {ConnectionComponent} from "./connection/connection.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RegistrationComponent} from "./registration/registration.component";
import {JobsOfferComponent} from "./jobs-offer/jobs-offer.component";
import {JobsConfirmationComponent} from "./jobs-confirmation/jobs-confirmation.component";
import {ProfilComponent} from "./profil/profil.component";
import {JobSubmitionComponent} from "./job-submition/job-submition.component";
import {CandidatureComponent} from "./candidature/candidature.component";

const routes: Routes = [
  {path: '', redirectTo: '/connection', pathMatch: 'full'},
  {path: 'account-creation', component: AccountCreationComponent},
  {path: 'booking-request', component: BookingRequestComponent},
  {path: 'connection', component: ConnectionComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'jobs-offer', component: JobsOfferComponent},
  {path: 'jobs-confirmation', component: JobsConfirmationComponent},
  {path: 'profile', component: ProfilComponent},
  {path: 'job-submition', component: JobSubmitionComponent},
  {path: 'candidature', component: CandidatureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
