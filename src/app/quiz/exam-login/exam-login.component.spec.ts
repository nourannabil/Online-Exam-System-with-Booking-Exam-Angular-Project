import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamLoginComponent } from './exam-login.component';

describe('ExamLoginComponent', () => {
  let component: ExamLoginComponent;
  let fixture: ComponentFixture<ExamLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamLoginComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExamLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
