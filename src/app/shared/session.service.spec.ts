import { TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;
  let mockLocalStorage: any = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionService]
    });

    service = TestBed.inject(SessionService);

    // Mocking localStorage
    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return mockLocalStorage[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): void => {
      mockLocalStorage[key] = value;
    });

    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete mockLocalStorage[key];
    });
  });

  afterEach(() => {
    mockLocalStorage = {};
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set session values', () => {
    service.setSession('token1', 'userType1', 'userID1', 'userName1');
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'token1');
    expect(localStorage.setItem).toHaveBeenCalledWith('userType', 'userType1');
    expect(localStorage.setItem).toHaveBeenCalledWith('userID', 'userID1');
    expect(localStorage.setItem).toHaveBeenCalledWith('userName', 'userName1');
  });

  it('should get token', () => {
    mockLocalStorage['token'] = 'token1';
    expect(service.getToken()).toBe('token1');
  });

  it('should get userName', () => {
    mockLocalStorage['userName'] = 'John';
    expect(service.getUserName()).toBe('John');
  });

  it('should get userType', () => {
    mockLocalStorage['userType'] = 'admin';
    expect(service.getUserType()).toBe('admin');
  });

  it('should get userID', () => {
    mockLocalStorage['userID'] = '1234';
    expect(service.getUserID()).toBe('1234');
  });

  it('should log out (clear) session', () => {
    service.logOutSession();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userType');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userID');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userName');
  });
});

