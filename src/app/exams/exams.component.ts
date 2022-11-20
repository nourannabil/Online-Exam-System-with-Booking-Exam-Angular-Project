import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  constructor(private router:Router,public home:HomeService) { }
  examName: FormControl = new FormControl('');

  ngOnInit(): void {
    this.home.getAllExams();
  }

}
