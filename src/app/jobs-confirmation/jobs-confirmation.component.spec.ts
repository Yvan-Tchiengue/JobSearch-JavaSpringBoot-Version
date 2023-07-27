import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsConfirmationComponent } from './jobs-confirmation.component';

describe('JobsConfirmationComponent', () => {
  let component: JobsConfirmationComponent;
  let fixture: ComponentFixture<JobsConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobsConfirmationComponent]
    });
    fixture = TestBed.createComponent(JobsConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
