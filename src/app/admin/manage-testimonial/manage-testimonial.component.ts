import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-testimonial',
  templateUrl: './manage-testimonial.component.html',
  styleUrls: ['./manage-testimonial.component.css']
})
export class ManageTestimonialComponent implements OnInit {

  constructor(public home:HomeService,public admin:AdminService) { }

  ngOnInit(): void {
    this.home.gettestimonialinfo();
    this.home.GetAllUsers();
    this.home.getAllStatus();
  }
  displayedColumns: string[] = ['testimonialid','feedback','statusid','userid','homeid','Options'];
  dataSource = '';

  AcceptTest(testId:number){
  this.admin.MakeTestAccepted(testId);
  }
  RejectTest(testId:number){
    this.admin.MakeTestRejected(testId);
  }
  DeleteTest(testId:number){
   this.admin.DeleteTest(testId);
  }

}

