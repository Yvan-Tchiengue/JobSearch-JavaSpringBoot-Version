import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeJobsOfferComponent } from './employe-jobs-offer.component';

describe('EmployeJobsOfferComponent', () => {
  let component: EmployeJobsOfferComponent;
  let fixture: ComponentFixture<EmployeJobsOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeJobsOfferComponent]
    });
    fixture = TestBed.createComponent(EmployeJobsOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
