import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private candidatures: any[] = []; // Remplacez 'any[]' par le type approprié pour les candidatures (peut-être une interface)

  constructor() {
    // Vous pouvez initialiser les candidatures ici ou les récupérer depuis le backend
    this.candidatures = [
      {
        id: 1,
        jobTitle: 'Développeur Front-end',
        candidateName: 'John Doe',
        candidateEmail: 'john.doe@example.com',
        candidatePhone: '123-456-7890',
        // Autres informations sur la candidature
      },
      {
        id: 2,
        jobTitle: 'Développeur Back-end',
        candidateName: 'Jane Doe',
        candidateEmail: 'jane.doe@example.com',
        candidatePhone: '987-654-3210',
        // Autres informations sur la candidature
      },
      // Ajoutez plus de candidatures si nécessaire
    ];
  }

  getCandidatures(): any[] { // Remplacez 'any[]' par le type approprié pour les candidatures (peut-être une interface)
    return this.candidatures;
  }

  // Vous pouvez également ajouter d'autres méthodes pour ajouter, supprimer ou mettre à jour des candidatures si nécessaire
}
