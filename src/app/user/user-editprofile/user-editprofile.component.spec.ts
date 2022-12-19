import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditprofileComponent } from './user-editprofile.component';

describe('UserEditprofileComponent', () => {
  let component: UserEditprofileComponent;
  let fixture: ComponentFixture<UserEditprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
