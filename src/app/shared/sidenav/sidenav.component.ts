import {Component, ViewChild} from '@angular/core';
import {SessionService} from "../session.service";
import {MatSidenav} from "@angular/material/sidenav";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {


  userType: string | null | undefined;

  constructor(private sessionService: SessionService,
              private router: Router) { }

  @ViewChild('sidenav') sidenav!: MatSidenav;

  close() {
    this.sidenav.close();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.sidenav.open();
    });
  }

  ngOnInit(): void {
    this.userType = this.sessionService.getUserType();
    //alert("le usertype est: " +this.userType);
  }

  showFiller = false;
  sidenavOpened = true;

  sidenavWidth = 4;
  selectedItem: string | null = null;

  selectItem(item: string) {
    this.selectedItem = item;
  }


  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }
  decrease() {
    this.sidenavWidth = 4;
    console.log('decrease sidenav width');
  }

  goToProfile(){
    this.router.navigate(['/profile']);
  }


}
