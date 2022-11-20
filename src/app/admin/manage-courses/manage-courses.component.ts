import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent implements OnInit {

  constructor(public Home:HomeService) { }

  ngOnInit(): void {
    this.Home.getAllCourses();
  }

  displayedColumns: string[] = ['position', 'name','description' ,'symbol' , 'Options'];
  dataSource = '';
}
