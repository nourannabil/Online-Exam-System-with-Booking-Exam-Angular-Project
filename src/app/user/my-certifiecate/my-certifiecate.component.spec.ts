import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCertifiecateComponent } from './my-certifiecate.component';

describe('MyCertifiecateComponent', () => {
  let component: MyCertifiecateComponent;
  let fixture: ComponentFixture<MyCertifiecateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCertifiecateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCertifiecateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
