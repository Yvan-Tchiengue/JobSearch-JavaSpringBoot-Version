import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountCreationComponent} from "./account-creation/account-creation.component";
import {BookingRequestComponent} from "./booking-request/booking-request.component";
import {ConnectionComponent} from "./connection/connection.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RegistrationComponent} from "./registration/registration.component";

const routes: Routes = [
  {path: '', redirectTo: '/connection', pathMatch: 'full'},
  {path: 'account-creation', component: AccountCreationComponent},
  {path: 'booking-request', component: BookingRequestComponent},
  {path: 'connection', component: ConnectionComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
