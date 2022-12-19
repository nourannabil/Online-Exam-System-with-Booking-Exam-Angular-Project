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

  slideNum=0;
  constructor(private spinner:NgxSpinnerService,public home:HomeService) { }

  ngOnInit(): void {
    this.home.getStatistics();
    this.home.getHomeSlider();
    this.home.getAboutInfo();
    this.home.getAllContact();
    // this.home.gettestimonialinfo();
    this.home.GetAllUsers();
    this.home.getAcceptedTestimonial();
  }

  PreviousQuestion() {
    this.slideNum--;
  }



  NextQuestion() {
    this.slideNum++;
  }
  ResetSlideNum(){
    this.slideNum=0;
  }
  startSlideNum(){
    this.slideNum=0;

  }


}
