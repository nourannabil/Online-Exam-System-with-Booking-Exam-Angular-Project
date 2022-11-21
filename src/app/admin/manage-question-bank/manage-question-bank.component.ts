import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-question-bank',
  templateUrl: './manage-question-bank.component.html',
  styleUrls: ['./manage-question-bank.component.css']
})
export class ManageQuestionBankComponent implements OnInit {

  constructor(public Home:HomeService) { }

  ngOnInit(): void {
    this.Home.getAllCourses();
    this.Home.getAllQuestionBank();
  }

  displayedColumns: string[] = ['position', 'name','description','description1','description2', 'description3',  'description4','symbol' ,'course', 'Options'];
  dataSource = '';
  
}
