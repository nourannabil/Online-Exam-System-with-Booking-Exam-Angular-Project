import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  constructor() { }
  testimonials:any[]=
  [
    {
      image:'./assets/images/client/testimonial1.jpg',
      name:'Joen',
      feedback:'nice',
    },
    {
      image:'./assets/images/client/testimonial1.jpg',
      name:'sam',
      feedback:'wow'
    }
  ]
  ngOnInit(): void {
  }

}
