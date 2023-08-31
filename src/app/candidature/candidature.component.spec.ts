import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CandidatureComponent } from './candidature.component';
import { CandidatureService } from "../shared/candidature.service";
import {HeaderComponent} from "../header/header.component";
import { MatCardModule } from '@angular/material/card';
import {FooterComponent} from "../footer/footer.component";

// Mock CandidatureService
class MockCandidatureService {
  getCandidatures() {
    return [
      { jobTitle: 'Dev', candidateName: 'tony', candidateEmail: 'tony@example.com', candidatePhone: '1234567890' },
    ];
  }
}

describe('CandidatureComponent', () => {
  let component: CandidatureComponent;
  let fixture: ComponentFixture<CandidatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidatureComponent, HeaderComponent, FooterComponent],
      imports: [MatCardModule],
      providers: [
        { provide: CandidatureService, useClass: MockCandidatureService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

