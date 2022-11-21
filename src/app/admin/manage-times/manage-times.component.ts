import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';


@Component({
  selector: 'app-manage-times',
  templateUrl: './manage-times.component.html',
  styleUrls: ['./manage-times.component.css']
})
export class ManageTimesComponent implements OnInit {

  constructor(public Home:HomeService) { }

  ngOnInit(): void {
    this.Home.getAllStatus();
    this.Home.getAllExams();
    this.Home.getAllAvailableTime();
  }

  displayedColumns: string[] = ['position', 'name','description' ,'symbol' , 'Options'];
  dataSource = '';
}
