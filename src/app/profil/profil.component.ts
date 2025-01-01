import { Component } from '@angular/core';
import {ProfileService} from "../shared/profile.service";
import {HttpClient} from "@angular/common/http";

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
  isApplied: boolean = false;
  isApplied1: boolean = false;
  isApplied2: boolean = false;
  isApplied3: boolean = false;

  constructor(private profilService: ProfileService,
              private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/api';

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
        },
        (error) => {
          console.error('File upload error :', error);
        }
      );
    }
  }

  onFilesTitleOfStayUpload(): void {
    this.isApplied2 = true;
    if (this.titleOfStayFile) {
      this.profilService.uploadTitleOfStayFiles(this.titleOfStayFile).subscribe(
        () => {
        },
        (error) => {
          console.error('File upload error:', error);
        }
      );
    }
  }

  onFilesIdentityCardUpload(): void {
    this.isApplied = true;
    if (this.identityCardFile) {
      this.profilService.uploadIdentityCardFiles(this.identityCardFile).subscribe(
        () => {
        },
        (error) => {
          console.error('File upload error :', error);
        }
      );
    }
  }

  onFilesWorkPermitUpload(): void {
    this.isApplied3 = true;
    if (this.workPermitFile) {
      this.profilService.uploadWorkPermitFiles(this.workPermitFile).subscribe(
        () => {
        },
        (error) => {
          console.error('File upload error :', error);
        }
      );
    }
  }

  onFilesMotivationLetterUpload(): void {
    this.isApplied1 = true;
    if (this.motivationLetterFile) {
      this.profilService.uploadMotivationLetterFiles(this.motivationLetterFile).subscribe(
        () => {
        },
        (error) => {
          console.error('File upload error :', error);
        }
      );
    }
  }
}
