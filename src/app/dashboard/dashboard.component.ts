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

  constructor(private sessionService: SessionService) { }

  @ViewChild('sidenav') sidenav!: MatSidenav;

  close() {
    this.sidenav.close();
  }

  ngAfterViewInit() {
    this.sidenav.open();
  }

  ngOnInit(): void {
    this.userType = this.sessionService.getUserType();
    alert("le usertype est: " +this.userType);
  }

  showFiller = false;
  sidenavOpened = true;

}
