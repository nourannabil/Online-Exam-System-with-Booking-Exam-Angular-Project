import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuestionBankComponent } from './manage-question-bank.component';

describe('ManageQuestionBankComponent', () => {
  let component: ManageQuestionBankComponent;
  let fixture: ComponentFixture<ManageQuestionBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageQuestionBankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageQuestionBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
