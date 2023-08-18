import { TestBed } from '@angular/core/testing';
import { ProfileService } from './profile.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    });
    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('File Uploads', () => {
    const mockToken = 'testToken';
    const mockFile = new File([''], 'filename.txt', { type: 'text/plain' });

    beforeEach(() => {
      spyOn(service['authService'], 'getLocalStorage').and.returnValue(mockToken);
    });

    it('should upload multiple files', () => {
      service.uploadFiles(mockFile, mockFile, mockFile, mockFile).subscribe(response => {
        expect(response).toEqual({ success: true });
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/uploadFiles`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true });
    });

    it('should upload title of stay file', () => {
      service.uploadTitleOfStayFiles(mockFile).subscribe(response => {
        expect(response).toEqual({ success: true });
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/uploadTitleOfStayFiles`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true });
    });

    it('should upload identity card file', () => {
      service.uploadIdentityCardFiles(mockFile).subscribe(response => {
        expect(response).toEqual({ success: true });
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/uploadIdentityCardFiles`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true });
    });

    it('should upload work permit file', () => {
      service.uploadWorkPermitFiles(mockFile).subscribe(response => {
        expect(response).toEqual({ success: true });
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/uploadWorkPermitFiles`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true });
    });

    it('should upload motivation letter file', () => {
      service.uploadMotivationLetterFiles(mockFile).subscribe(response => {
        expect(response).toEqual({ success: true });
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/uploadMotivationLetterFiles`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true });
    });
  });
});
