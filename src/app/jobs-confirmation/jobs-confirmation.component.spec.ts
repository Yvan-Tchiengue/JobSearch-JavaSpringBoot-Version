import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobsConfirmationComponent } from './jobs-confirmation.component';
import { JobOfferService } from '../shared/job-offer.service';
import { SessionService } from '../shared/session.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('JobsConfirmationComponent', () => {
  let component: JobsConfirmationComponent;
  let fixture: ComponentFixture<JobsConfirmationComponent>;
  let mockJobOfferService: Partial<JobOfferService>;
  let mockAuthService: Partial<SessionService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockAuthService = {
      getLocalStorage: jasmine.createSpy('getLocalStorage').and.returnValue('test-token')
    };

    TestBed.configureTestingModule({
      declarations: [JobsConfirmationComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: JobOfferService, useValue: mockJobOfferService },
        { provide: SessionService, useValue: mockAuthService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(JobsConfirmationComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch favorable job offers on init', () => {
    expect(mockJobOfferService.getOffresFavorables).toHaveBeenCalled();
    expect(component.offresFavorables.length).toBe(1);
  });

  it('should make HTTP call on seeConfirmation', () => {
    component.seeConfirmation();

    const req = httpTestingController.expectOne('http://localhost:3000/api/see-confirmation');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');

    req.flush([{ title: 'Job1', confirmation: 'accepted' }]);

    expect(component.jobs.length).toBe(1);
    expect(component.jobs[0].confirmationStatus).toBe('accepted');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
