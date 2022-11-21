import { Component,Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomeService } from '../Services/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // statistics inputs
  @Input()numOfBooking:number=0;
  @Input()numOfUser:number=0;
  @Input()numOfExams:number=0;
  @Input()numOfExamBooked:number=0;
  @Input()numOfUserBooked:number=0;
  @Input()examNotBooked:number=0;

  //  //home slider inputs
  //  @Input()homeid:number=0;
  //  @Input()imagepath:string|undefined;
  //  @Input()title:string|undefined;
  //  @Input()description1:string|undefined;
  //  @Input()description2:string|undefined;
  //  @Input()description3:string|undefined;


  constructor(private spinner:NgxSpinnerService,public home:HomeService) { }

  ngOnInit(): void {
    this.home.getStatistics();
    this.home.getHomeSlider();
    this.home.getAboutInfo();
    this.home.getAllContact();

  }

}
