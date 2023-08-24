import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeJobsOfferComponent } from './employe-jobs-offer.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SessionService } from '../shared/session.service';
import {HeaderComponent} from "../header/header.component";

describe('EmployeJobsOfferComponent', () => {
  let component: EmployeJobsOfferComponent;
  let fixture: ComponentFixture<EmployeJobsOfferComponent>;
  let mockSessionService: any;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockSessionService = {
      getLocalStorage: jasmine.createSpy('getLocalStorage').and.returnValue('mock-token'),
      getUserType: jasmine.createSpy('getUserType').and.returnValue('mock-user-type'),
      getUserName: jasmine.createSpy('getUserName').and.returnValue('mock-username') // Mocking the getUserName method
    };

    TestBed.configureTestingModule({
      declarations: [EmployeJobsOfferComponent, HeaderComponent],
      imports: [HttpClientTestingModule], // Use this module to mock HTTP requests
      providers: [
        { provide: SessionService, useValue: mockSessionService }
      ]
    });

    fixture = TestBed.createComponent(EmployeJobsOfferComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure no outstanding requests
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch jobs when getJobs() is called', () => {
    const mockJobs = [
      { title: 'Job 1', location: 'Location 1', description: 'Description 1' },
      { title: 'Job 2', location: 'Location 2', description: 'Description 2' }
    ];
    component.getJobs();
    const request = httpTestingController.expectOne('http://localhost:3000/api/myJobsOffer');
    expect(request.request.method).toEqual('GET');
    expect(request.request.headers.get('Authorization')).toBe('Bearer mock-token');
    request.flush(mockJobs);
    expect(component.jobs).toEqual(mockJobs);
  });

  it('should have empty jobs array initially', () => {
    expect(component.jobs.length).toBe(0);
  });
});
