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
import {EmployeJobsOfferComponent} from "./employe-jobs-offer/employe-jobs-offer.component";
import {ApplicationComponent} from "./application/application.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: '', redirectTo: '/connection', pathMatch: 'full'},
  {path: 'account-creation', component: AccountCreationComponent},
  {path: 'booking-request', component: BookingRequestComponent},
  {path: 'connection', component: ConnectionComponent},
  {path: 'home', component: HomeComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'jobs-confirmation', component: JobsConfirmationComponent},
  {path: 'jobs-offer', component: JobsOfferComponent},
  {path: 'job-submition', component: JobSubmitionComponent},
  {path: 'candidature', component: CandidatureComponent},
  {path: 'employe-jobs-offer', component: EmployeJobsOfferComponent},
  {path: 'applications', component: ApplicationComponent},
  {path: 'profile', component: ProfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
