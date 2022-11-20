import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EaxamInfoCardComponent } from './eaxam-info-card.component';

describe('EaxamInfoCardComponent', () => {
  let component: EaxamInfoCardComponent;
  let fixture: ComponentFixture<EaxamInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EaxamInfoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EaxamInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
