import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseExamsComponent } from './course-exams.component';

describe('CourseExamsComponent', () => {
  let component: CourseExamsComponent;
  let fixture: ComponentFixture<CourseExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseExamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
