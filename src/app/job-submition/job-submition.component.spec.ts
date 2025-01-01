import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSubmitionComponent } from './job-submition.component';

describe('JobSubmitionComponent', () => {
  let component: JobSubmitionComponent;
  let fixture: ComponentFixture<JobSubmitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobSubmitionComponent]
    });
    fixture = TestBed.createComponent(JobSubmitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
