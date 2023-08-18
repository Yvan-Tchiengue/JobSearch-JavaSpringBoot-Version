import { TestBed } from '@angular/core/testing';
import { CandidatureService } from './candidature.service';

describe('CandidatureService', () => {
  let service: CandidatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidatureService]
    });
    service = TestBed.inject(CandidatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct candidatures', () => {
    const candidatures = service.getCandidatures();
    expect(candidatures.length).toBeGreaterThan(0);
    expect(candidatures[0].id).toBeTruthy();
    expect(candidatures[0].jobTitle).toBeTruthy();
    expect(candidatures[0].candidateName).toBeTruthy();
    expect(candidatures[0].candidateEmail).toBeTruthy();
    expect(candidatures[0].candidatePhone).toBeTruthy();
  });
});

