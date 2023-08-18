import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private candidatures: any[] = [];

  constructor() {
    this.candidatures = [
      {
        id: 1,
        jobTitle: 'Développeur Front-end',
        candidateName: 'John Doe',
        candidateEmail: 'john.doe@example.com',
        candidatePhone: '123-456-7890',
      },
      {
        id: 2,
        jobTitle: 'Développeur Back-end',
        candidateName: 'Jane Doe',
        candidateEmail: 'jane.doe@example.com',
        candidatePhone: '987-654-3210',
      },
    ];
  }

  getCandidatures(): any[] {
    return this.candidatures;
  }

}
