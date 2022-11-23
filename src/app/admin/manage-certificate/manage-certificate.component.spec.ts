import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCertificateComponent } from './manage-certificate.component';

describe('ManageCertificateComponent', () => {
  let component: ManageCertificateComponent;
  let fixture: ComponentFixture<ManageCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
