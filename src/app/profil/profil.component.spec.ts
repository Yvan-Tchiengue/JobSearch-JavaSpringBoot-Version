import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilComponent } from './profil.component';
import { ProfileService } from '../shared/profile.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import {HeaderComponent} from "../header/header.component";

describe('ProfilComponent', () => {
  let component: ProfilComponent;
  let fixture: ComponentFixture<ProfilComponent>;
  let mockService: any;

  const mockProfileService = {
    uploadFiles: (titleOfStayFile: File, identityCardFile: File, workPermitFile: File, motivationLetterFile: File) => of(true),
    uploadIdentityCardFiles: (file: File) => of(true),
    uploadTitleOfStayFiles: (file: File) => of(true),
    uploadWorkPermitFiles: (file: File) => of(true),
    uploadMotivationLetterFiles: (file: File) => of(true),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilComponent, HeaderComponent],
      providers: [
        { provide: ProfileService, useValue: mockProfileService },
        { provide: HttpClient, useValue: {} }
      ]
    });

    fixture = TestBed.createComponent(ProfilComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(ProfileService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should upload IdentityCard when onFilesIdentityCardUpload is called and file is present', () => {
    spyOn(mockService, 'uploadIdentityCardFiles').and.returnValue(of(true));
    component.identityCardFile = new File([""], "filename", { type: "text/html" });
    component.onFilesIdentityCardUpload();
    expect(mockService.uploadIdentityCardFiles).toHaveBeenCalled();
  });

  it('should upload IdentityCard when onFilesIdentityCardUpload is called and file is present', () => {
    spyOn(mockService, 'uploadIdentityCardFiles').and.returnValue(of(true));
    component.identityCardFile = new File([""], "filename", { type: "text/html" });
    component.onFilesIdentityCardUpload();
    expect(mockService.uploadIdentityCardFiles).toHaveBeenCalled();
  });

  it('should upload TitleOfStay when onFilesTitleOfStayUpload is called and file is present', () => {
    spyOn(mockService, 'uploadTitleOfStayFiles').and.returnValue(of(true));
    component.titleOfStayFile = new File([""], "filename", { type: "text/html" });
    component.onFilesTitleOfStayUpload();
    expect(mockService.uploadTitleOfStayFiles).toHaveBeenCalled();
  });

  it('should upload WorkPermit when onFilesWorkPermitUpload is called and file is present', () => {
    spyOn(mockService, 'uploadWorkPermitFiles').and.returnValue(of(true));
    component.workPermitFile = new File([""], "filename", { type: "text/html" });
    component.onFilesWorkPermitUpload();
    expect(mockService.uploadWorkPermitFiles).toHaveBeenCalled();
  });

  it('should upload MotivationLetter when onFilesMotivationLetterUpload is called and file is present', () => {
    spyOn(mockService, 'uploadMotivationLetterFiles').and.returnValue(of(true));
    component.motivationLetterFile = new File([""], "filename", { type: "text/html" });
    component.onFilesMotivationLetterUpload();
    expect(mockService.uploadMotivationLetterFiles).toHaveBeenCalled();
  });

  it('should handle error if uploadIdentityCardFiles service fails', () => {
    spyOn(mockService, 'uploadIdentityCardFiles').and.returnValue(throwError('Error occurred'));
    spyOn(console, 'error');
    component.identityCardFile = new File([""], "filename", { type: "text/html" });
    component.onFilesIdentityCardUpload();
    expect(console.error).toHaveBeenCalledWith('File upload error :', 'Error occurred');
  });

  it('should handle error if uploadTitleOfStayFiles service fails', () => {
    spyOn(mockService, 'uploadTitleOfStayFiles').and.returnValue(throwError('Error occurred'));
    spyOn(console, 'error');
    component.titleOfStayFile = new File([""], "filename", { type: "text/html" });
    component.onFilesTitleOfStayUpload();
    expect(console.error).toHaveBeenCalledWith('File upload error :', 'Error occurred');
  });

  it('should handle error if uploadWorkPermitFiles service fails', () => {
    spyOn(mockService, 'uploadWorkPermitFiles').and.returnValue(throwError('Error occurred'));
    spyOn(console, 'error');
    component.workPermitFile = new File([""], "filename", { type: "text/html" });
    component.onFilesWorkPermitUpload();
    expect(console.error).toHaveBeenCalledWith('File upload error :', 'Error occurred');
  });

  it('should handle error if uploadMotivationLetterFiles service fails', () => {
    spyOn(mockService, 'uploadMotivationLetterFiles').and.returnValue(throwError('Error occurred'));
    spyOn(console, 'error');
    component.motivationLetterFile = new File([""], "filename", { type: "text/html" });
    component.onFilesMotivationLetterUpload();
    expect(console.error).toHaveBeenCalledWith('File upload error :', 'Error occurred');
  });

});


