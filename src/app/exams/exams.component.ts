import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  constructor(private router: Router, public home: HomeService) { }
  // examName: FormControl = new FormControl(' ');
  examName: string = "";

  ngOnInit(): void {
    this.home.getAllExams();
    this.home.getAllAvailable();
  }
  newexams: any[] = this.home.exams;
  Search(ev: any) {
    // debugger
    this.examName = ev.target.value;
    // this.home.SearchByExamName(ev.target.value)
  }

  SearchButton() {
    if (this.examName == ''){
      this.home.getAllExams();
    }else{
      this.home.SearchByExamName(this.examName)
      console.log(this.home.exams);
    }
  }
}
