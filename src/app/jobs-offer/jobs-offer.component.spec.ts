import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobsOfferComponent } from './jobs-offer.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JobOfferService } from '../shared/job-offer.service';
import { SessionService } from '../shared/session.service';
import { By } from '@angular/platform-browser';
import {HeaderComponent} from "../header/header.component";
import {MatFormFieldModule} from '@angular/material/form-field';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('JobsOfferComponent', () => {
  let component: JobsOfferComponent;
  let fixture: ComponentFixture<JobsOfferComponent>;
  let httpMock: HttpTestingController;

  const mockJobOffers = [
    { title: 'Developer', location: 'Location 1', description: 'Job 1 description', isApplied: false },
    { title: 'Designer', location: 'Location 2', description: 'Job 2 description', isApplied: false }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
      declarations: [JobsOfferComponent, HeaderComponent],
      providers: [
        JobOfferService,
        {
          provide: SessionService,
          useValue: {
            getLocalStorage: jasmine.createSpy('getLocalStorage').and.returnValue('mockToken'),
            getUserType: jasmine.createSpy('getUserType').and.returnValue('mockUserType'),
            getUserName: jasmine.createSpy('getUserName').and.returnValue('mockUserName')
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(JobsOfferComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch jobs when "rechercherJobs" is called', () => {
    component.findJobs();
    const req = httpMock.expectOne('http://localhost:3000/api/jobsOffer');
    expect(req.request.method).toBe('GET');
    req.flush(mockJobOffers);
    expect(component.jobs.length).toBe(2);
    expect(component.jobs[0].title).toBe('Developer');
  });

  it('should send candidature when "sendCandidature" is called', () => {
    const mockJob = { title: 'Developer', location: 'Location 1', description: 'Job 1 description', isApplied: false };
    component.sendCandidature(mockJob);
    expect(mockJob.isApplied).toBeTrue();
    const req = httpMock.expectOne('http://localhost:3000/api/upload-candidature');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush({});
  });

  it('should render job offers', () => {
    component.jobs = mockJobOffers;
    fixture.detectChanges();
    const jobTitles = fixture.debugElement.queryAll(By.css('mat-card-title'));
    expect(jobTitles.length).toBe(2);
    expect(jobTitles[0].nativeElement.textContent).toContain('Developer');
    expect(jobTitles[1].nativeElement.textContent).toContain('Designer');
  });

});
