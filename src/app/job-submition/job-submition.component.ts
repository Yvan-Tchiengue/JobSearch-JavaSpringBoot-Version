import { Component } from '@angular/core';
import { Job } from '../Job';

@Component({
  selector: 'app-job-submition',
  templateUrl: './job-submition.component.html',
  styleUrls: ['./job-submition.component.css']
})
export class JobSubmitionComponent {


  job: Job = { title: '', description: '', requirements: '' }; // Modèle du formulaire pour le job

  constructor() { }

  submitJob(): void {
    // Ici, vous pouvez envoyer les données du formulaire vers le backend pour les sauvegarder dans la base de données
    // Assurez-vous d'importer le service approprié pour gérer les opérations avec le backend
    // Par exemple : this.jobService.saveJob(this.job).subscribe(...);
    console.log('Job soumis avec succès :', this.job);
  }

}
