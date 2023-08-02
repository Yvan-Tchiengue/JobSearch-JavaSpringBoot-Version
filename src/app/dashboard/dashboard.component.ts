import { Component, OnInit } from '@angular/core';
import { SessionService} from "../shared/session.service";
import {MatSidenav} from "@angular/material/sidenav";
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  userType: string | null | undefined;

  constructor(private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.userType = this.sessionService.getUserType();
  }

}
