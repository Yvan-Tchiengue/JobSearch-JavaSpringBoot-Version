import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { SessionService } from '../shared/session.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockSessionService: Partial<SessionService>;
  let router: Router;

  beforeEach(() => {
    mockSessionService = {
      getUserType: jasmine.createSpy('getUserType').and.returnValue('jobseeker'),
      getUserName: jasmine.createSpy('getUserName').and.returnValue('Tony Yvanno'),
      logOutSession: jasmine.createSpy('logOutSession')
    };

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule, MatToolbarModule, MatButtonModule],
      providers: [{ provide: SessionService, useValue: mockSessionService }],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user type and name on init', () => {
    expect(mockSessionService.getUserType).toHaveBeenCalled();
    expect(mockSessionService.getUserName).toHaveBeenCalled();
    expect(component.userType).toBe('jobseeker');
    expect(component.userName).toBe('Tony Yvanno');
  });

  it('should call logOutSession and navigate to /connection on logout', () => {
    component.logout();
    expect(mockSessionService.logOutSession).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/connection']);
  });

  it('should navigate to /dashboard on calling dashboard', () => {
    component.dashboard();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});

