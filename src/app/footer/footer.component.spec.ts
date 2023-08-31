import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct copyright text', () => {
    const footerElement = nativeElement.querySelector('footer');
    const footerText = footerElement ? footerElement.textContent : null;
    expect(footerText).toContain('Yvan Tchiengue. Copyright © 2023');
  });

});
