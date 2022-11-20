import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsCardsComponent } from './exams-cards.component';

describe('ExamsCardsComponent', () => {
  let component: ExamsCardsComponent;
  let fixture: ComponentFixture<ExamsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamsCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
