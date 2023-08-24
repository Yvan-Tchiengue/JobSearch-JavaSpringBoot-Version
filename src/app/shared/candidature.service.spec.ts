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
});

