import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-testimonial',
  templateUrl: './manage-testimonial.component.html',
  styleUrls: ['./manage-testimonial.component.css']
})
export class ManageTestimonialComponent implements OnInit {

  constructor(public home:HomeService) { }

  ngOnInit(): void {
    this.home.gettestimonialinfo();
  }
  displayedColumns: string[] = ['testimonialid','feedback','statusid','userid','homeid','Options'];
  dataSource = '';
}
