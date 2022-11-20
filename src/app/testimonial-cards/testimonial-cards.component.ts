import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-testimonial-cards',
  templateUrl: './testimonial-cards.component.html',
  styleUrls: ['./testimonial-cards.component.css']
})
export class TestimonialCardsComponent implements OnInit {

  constructor(public home:HomeService) { }
   @Input() Image:string|undefined
   @Input() Name:string|undefined
   @Input() Feedback:string|undefined
  ngOnInit(): void {
  }

}
