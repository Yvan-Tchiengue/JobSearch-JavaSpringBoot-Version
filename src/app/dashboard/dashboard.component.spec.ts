import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { SessionService } from '../shared/session.service';
import { By } from '@angular/platform-browser';
import {HeaderComponent} from "../header/header.component";
import {MatToolbarModule} from "@angular/material/toolbar";

class MockSessionService {
  getUserType(): string {
    return 'jobseeker';
  }

  getUserName(): string {
    return 'MockUserName'; // Return a mock username or whatever is expected.
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let sessionService: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatToolbarModule],
      declarations: [DashboardComponent, HeaderComponent],
      providers: [
        { provide: SessionService, useClass: MockSessionService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    sessionService = TestBed.inject(SessionService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the jobseeker message', () => {
    spyOn(sessionService, 'getUserType').and.returnValue('jobseeker');
    component.ngOnInit();
    fixture.detectChanges();

    const messageElement = fixture.debugElement.query(By.css('.welcome-message p')).nativeElement;
    expect(messageElement.textContent).toContain('You can search for jobs, submit your application and discover a wide range of professional opportunities.');
  });

  it('should display the employee message', () => {
    spyOn(sessionService, 'getUserType').and.returnValue('employe');
    component.ngOnInit();
    fixture.detectChanges();

    const messageElement = fixture.debugElement.query(By.css('.welcome-message p')).nativeElement;
    expect(messageElement.textContent).toContain('You can submit your Booking Request and discover a wide range of professional Jobseeker.');
  });

  it('should not display any message if userType is neither jobseeker nor employe', () => {
    spyOn(sessionService, 'getUserType').and.returnValue(null);
    component.ngOnInit();
    fixture.detectChanges();

    const messageElement = fixture.debugElement.query(By.css('.welcome-message p'));
    expect(messageElement).toBeNull();
  });
});

