import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingRequestComponent } from './booking-request.component';
import { JobOfferService } from "../shared/job-offer.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import {HeaderComponent} from "../header/header.component";

describe('BookingRequestComponent', () => {
  let component: BookingRequestComponent;
  let fixture: ComponentFixture<BookingRequestComponent>;
  let mockJobOfferService: jasmine.SpyObj<JobOfferService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('JobOfferService', ['creerOffre']);

    TestBed.configureTestingModule({
      declarations: [BookingRequestComponent, HeaderComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: JobOfferService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingRequestComponent);
    component = fixture.componentInstance;
    mockJobOfferService = TestBed.inject(JobOfferService) as jasmine.SpyObj<JobOfferService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit job offer and show success message', () => {
    const mockOffer = {
      title: 'Test Title',
      description: 'Test Description',
      location: 'Test Location'
    };

    component.registerForm.setValue(mockOffer);
    mockJobOfferService.creerOffre.and.returnValue(of({}));

    spyOn(window, 'alert');

    component.submit();

    expect(mockJobOfferService.creerOffre).toHaveBeenCalledWith(mockOffer);
    expect(window.alert).toHaveBeenCalledWith('Offre d\'emploi créée avec succès!');
    expect(component.isSubmitted).toBeTrue();
  });

  it('should show error message when submission fails', () => {
    const mockOffer = {
      title: 'Test Title',
      description: 'Test Description',
      location: 'Test Location'
    };

    component.registerForm.setValue(mockOffer);
    const errorResponse = new ErrorEvent('error', {
      message: 'Failed to submit'
    });
    mockJobOfferService.creerOffre.and.returnValue(throwError(errorResponse));

    spyOn(window, 'alert');

    component.submit();

    expect(mockJobOfferService.creerOffre).toHaveBeenCalledWith(mockOffer);
    expect(window.alert).toHaveBeenCalledWith('Erreur lors de la création de l\'offre d\'emploi: Failed to submit');
  });
});
