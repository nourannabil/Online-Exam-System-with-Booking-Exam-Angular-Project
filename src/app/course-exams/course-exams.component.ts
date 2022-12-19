import { Component, OnInit } from '@angular/core';
import { HomeService } from '../Services/home.service';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-course-exams',
  templateUrl: './course-exams.component.html',
  styleUrls: ['./course-exams.component.css']
})
export class CourseExamsComponent implements OnInit {

  constructor(public home: HomeService) { }
  examName: FormControl = new FormControl('');

  courseExams = this.home.exams.filter((obj) => obj.courseid == this.home.selectedCourse.Id)

  ngOnInit(): void {
  }

}
