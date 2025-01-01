import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountCreationComponent } from './account-creation.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { JobOfferService } from '../shared/job-offer.service';
import { FormGroup, FormControl } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('AccountCreationComponent', () => {
  let component: AccountCreationComponent;
  let fixture: ComponentFixture<AccountCreationComponent>;
  let mockJobOfferService: jasmine.SpyObj<JobOfferService>;

  beforeEach(() => {
    mockJobOfferService = jasmine.createSpyObj(['createAccount']);

    TestBed.configureTestingModule({
      declarations: [AccountCreationComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: JobOfferService, useValue: mockJobOfferService },
        FormBuilder
      ]
    });

    fixture = TestBed.createComponent(AccountCreationComponent);
    component = fixture.componentInstance;
    component.registerForm = new FormGroup({
      namee: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      type_of_account: new FormControl(''),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form data to the service', () => {
    component.registerForm.setValue({
      namee: 'tony',
      email: 'tony@example.com',
      password: 'password1234',
      type_of_account: 'jobseeker'
    });

    mockJobOfferService.createAccount.and.returnValue(of({ success: true }));

    component.submit();

    expect(mockJobOfferService.createAccount).toHaveBeenCalledWith({
      namee: 'tony',
      email: 'tony@example.com',
      password: 'password1234',
      type_of_account: 'jobseeker'
    });
  });

  it('should handle service success response', () => {
    spyOn(window, 'alert');
    mockJobOfferService.createAccount.and.returnValue(of({ success: true }));

    component.submit();

    expect(window.alert).toHaveBeenCalledWith('Account created successfully!');
  });

  it('should handle service error response', () => {
    spyOn(window, 'alert');
    mockJobOfferService.createAccount.and.returnValue(throwError(new Error('Some error')));

    component.submit();

    expect(window.alert).toHaveBeenCalledWith('Account creation error');
  });
});
