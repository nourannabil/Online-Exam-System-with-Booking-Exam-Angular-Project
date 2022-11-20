import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private router:Router,public home:HomeService) { }

  ShowCourseExams(){

    this.router.navigate(['courseexams'])
  }
  ngOnInit(): void {
    this.home.getAllCourses();
    this.home.getAllExams();
  }

}
