import { Component } from '@angular/core';
import {ProfileService} from "../shared/profile.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {


  titleOfStayFile: File | null = null;
  identityCardFile: File | null = null;
  workPermitFile: File | null = null;
  motivationLetterFile: File | null = null;

  constructor(private profilService: ProfileService) { }

  onTitleOfStaySelected(event: any): void {
    this.titleOfStayFile = event.target.files[0];
  }

  onMotivationLetterSelected(event: any): void{
    this.motivationLetterFile = event.target.files[0];
  }

  onIdentityCardSelected(event: any): void {
    this.identityCardFile = event.target.files[0];
  }

  onWorkPermitSelected(event: any): void {
    this.workPermitFile = event.target.files[0];
  }

  onFilesUpload(): void {
    if (this.titleOfStayFile && this.identityCardFile && this.workPermitFile && this.motivationLetterFile) {
      this.profilService.uploadFiles(this.titleOfStayFile, this.identityCardFile, this.workPermitFile, this.motivationLetterFile).subscribe(
        () => {
          // Fichiers téléversés avec succès
          console.log('Fichiers téléversés avec succès');
        },
        (error) => {
          // Gérer les erreurs de téléversement ici
          console.error('Erreur lors du téléversement des fichiers :', error);
        }
      );
    }
  }

  onFilesTitleOfStayUpload(): void {
    if (this.titleOfStayFile) {
      this.profilService.uploadTitleOfStayFiles(this.titleOfStayFile).subscribe(
        () => {
          // Fichiers téléversés avec succès
          console.log('Fichiers téléversés avec succès');
        },
        (error) => {
          // Gérer les erreurs de téléversement ici
          console.error('Erreur lors du téléversement des fichiers :', error);
        }
      );
    }
  }

  onFilesIdentityCardUpload(): void {
    if (this.identityCardFile) {
      this.profilService.uploadIdentityCardFiles(this.identityCardFile).subscribe(
        () => {
          // Fichiers téléversés avec succès
          console.log('Fichiers téléversés avec succès');
        },
        (error) => {
          // Gérer les erreurs de téléversement ici
          console.error('Erreur lors du téléversement des fichiers :', error);
        }
      );
    }
  }

  onFilesWorkPermitUpload(): void {
    if (this.workPermitFile) {
      this.profilService.uploadWorkPermitFiles(this.workPermitFile).subscribe(
        () => {
          // Fichiers téléversés avec succès
          console.log('Fichiers téléversés avec succès');
        },
        (error) => {
          // Gérer les erreurs de téléversement ici
          console.error('Erreur lors du téléversement des fichiers :', error);
        }
      );
    }
  }

  onFilesMotivationLetterUpload(): void {
    if (this.motivationLetterFile) {
      this.profilService.uploadMotivationLetterFiles(this.motivationLetterFile).subscribe(
        () => {
          // Fichiers téléversés avec succès
          console.log('Fichiers téléversés avec succès');
        },
        (error) => {
          // Gérer les erreurs de téléversement ici
          console.error('Erreur lors du téléversement des fichiers :', error);
        }
      );
    }
  }
}
