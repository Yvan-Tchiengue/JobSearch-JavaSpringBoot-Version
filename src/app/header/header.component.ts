import { Component, OnInit } from '@angular/core';
import { SessionService} from "../shared/session.service";
import {Router} from "@angular/router";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor( private sessionService: SessionService,
               private router: Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.sessionService.logOutSession();
    this.router.navigate(['/connection']);
  }
  dashboard(){
    this.router.navigate(['/dashboard']);
  }

}
