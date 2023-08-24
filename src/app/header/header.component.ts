import { Component, OnInit } from '@angular/core';
import { SessionService} from "../shared/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userType: string | null | undefined;
  userName: string | null | undefined;

  constructor( private sessionService: SessionService,
               private router: Router) { }

  ngOnInit(): void {
    this.userType = this.sessionService.getUserType();
    this.userName = this.sessionService.getUserName();
  }

  logout(){
    this.sessionService.logOutSession();
    this.router.navigate(['/connection']);
  }
  dashboard(){
    this.router.navigate(['/dashboard']);
  }

}
