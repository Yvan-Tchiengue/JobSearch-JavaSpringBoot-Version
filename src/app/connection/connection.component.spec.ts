import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConnectionComponent } from './connection.component';
import { JobOfferService } from "../shared/job-offer.service";
import { SessionService } from "../shared/session.service";
import { of, throwError } from 'rxjs';
import {DashboardComponent} from "../dashboard/dashboard.component";

describe('ConnectionComponent', () => {
  let component: ConnectionComponent;
  let fixture: ComponentFixture<ConnectionComponent>;
  let mockAuthService: jasmine.SpyObj<JobOfferService>;
  let mockSessionService: jasmine.SpyObj<SessionService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('JobOfferService', ['authentification']);
    mockSessionService = jasmine.createSpyObj('SessionService', ['setSession']);

    TestBed.configureTestingModule({
      declarations: [ConnectionComponent, DashboardComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule,  RouterTestingModule.withRoutes([
        { path: 'dashboard', component: DashboardComponent }
      ])],
      providers: [
        { provide: JobOfferService, useValue: mockAuthService },
        { provide: SessionService, useValue: mockSessionService }
      ]
    });

    fixture = TestBed.createComponent(ConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message when email is empty and touched', () => {
    const emailControl = component.registerForm.get('email');
    emailControl?.markAsTouched();
    fixture.detectChanges();
    const emailErrorElement: HTMLElement = fixture.nativeElement.querySelector('.error');
    expect(emailErrorElement.textContent).toContain('Email is required');
  });

  it('should call authentification method and navigate to dashboard upon successful authentication', () => {
    mockAuthService.authentification.and.returnValue(of({ token: 'userToken', userType: 'user', userID: '123', userName: 'tony' }));
    component.submit();
    expect(mockAuthService.authentification).toHaveBeenCalled();
    expect(mockSessionService.setSession).toHaveBeenCalledWith('userToken', 'user', '123', 'tony');
  });

  /*it('should display an error message upon failed authentication', () => {
    mockAuthService.authentification.and.returnValue(throwError({ error: { error: 'Auth Error' } }));
    spyOn(window, 'alert');
    component.submit();
    expect(window.alert).toHaveBeenCalledWith('Authentication error: wrong email address or password!');
  });*/
});
