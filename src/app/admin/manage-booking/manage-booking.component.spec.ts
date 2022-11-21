import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBookingComponent } from './manage-booking.component';

describe('ManageBookingComponent', () => {
  let component: ManageBookingComponent;
  let fixture: ComponentFixture<ManageBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
