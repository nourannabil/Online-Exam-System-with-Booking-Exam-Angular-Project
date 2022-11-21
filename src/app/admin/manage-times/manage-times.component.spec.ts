import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTimesComponent } from './manage-times.component';

describe('ManageTimesComponent', () => {
  let component: ManageTimesComponent;
  let fixture: ComponentFixture<ManageTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTimesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
