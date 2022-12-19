import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditprofileComponent } from './admin-editprofile.component';

describe('AdminEditprofileComponent', () => {
  let component: AdminEditprofileComponent;
  let fixture: ComponentFixture<AdminEditprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
