import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationComponent } from './application.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SessionService } from '../shared/session.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ApplicationComponent', () => {
  let component: ApplicationComponent;
  let fixture: ComponentFixture<ApplicationComponent>;
  let httpTestingController: HttpTestingController;
  let sessionService: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ApplicationComponent],
      providers: [SessionService],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(ApplicationComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    sessionService = TestBed.inject(SessionService);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a GET request when openCandidatures is called', () => {
    const mockToken = 'mock-token';
    spyOn(sessionService, 'getLocalStorage').and.returnValue(mockToken);
    component.openCandidatures();
    const req = httpTestingController.expectOne('http://localhost:3000/api/myJobsCandidatures');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush([]);
  });

  it('should make a POST request when acceptCandidatures is called', () => {
    const mockToken = 'mock-token';
    const mockJob = { id: 1, title: 'Dev' };
    spyOn(sessionService, 'getLocalStorage').and.returnValue(mockToken);
    component.acceptCandidatures(mockJob);
    const req = httpTestingController.expectOne('http://localhost:3000/api/accept-candidatures');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush({});
  });

  it('should make a POST request when rejectCandidatures is called', () => {
    const mockToken = 'mock-token';
    const mockJob = { id: 2, title: 'Tester' };
    spyOn(sessionService, 'getLocalStorage').and.returnValue(mockToken);
    component.rejectCandidatures(mockJob);
    const req = httpTestingController.expectOne('http://localhost:3000/api/reject-candidatures');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush({});
  });

});

