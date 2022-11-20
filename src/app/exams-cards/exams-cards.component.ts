import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
