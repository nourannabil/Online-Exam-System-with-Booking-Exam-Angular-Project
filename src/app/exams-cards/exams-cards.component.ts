import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-exams-cards',
  templateUrl: './exams-cards.component.html',
  styleUrls: ['./exams-cards.component.css']
})
export class ExamsCardsComponent implements OnInit {
  @Input()examid:number=0;
  @Input()name:string|undefined
  @Input()description:string|undefined
  @Input()imagepath:string|undefined
  @Input()examduration:number=0;
  @Input()examprice:number=0;
  @Input()passmark:number=0;
  @Input()courseid:number=0;
  constructor(private router:Router, public home:HomeService) { }

  ngOnInit(): void {
  }
  opendetails(examid:number){
    this.home.getAllAvailable();
    this.home.getExamById(examid);
    this.home.examavailabletime=this.home.allAvailableTime.filter((x)=>x.examid==examid && x.statusid==3)
    console.log(this.home.examavailabletime);
    
    this.router.navigate(['examinfo']);
  }
}
