import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-exams',
  templateUrl: './manage-exams.component.html',
  styleUrls: ['./manage-exams.component.css']
})
export class ManageExamsComponent implements OnInit {

  constructor(public Home:HomeService) { }

  ngOnInit(): void {
    this.Home.getAllCourses();
    this.Home.getAllExams();
  }

  displayedColumns: string[] = ['position', 'name','description','examduration' , 'examprice','passmark','coursename' ,'symbol' , 'Options'];
  dataSource = '';
}
