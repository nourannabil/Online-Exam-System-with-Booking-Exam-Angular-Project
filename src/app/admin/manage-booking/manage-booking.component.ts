import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {

  constructor(public home:HomeService) { }

  ngOnInit(): void {
   this.home.getAllBooking();
   this.home.getAllExams();
   this.home.getAllStatus();
  }


  displayedColumns: string[] = ['bookingid','examdateuser','bookingdate','exampassword','examid','userid','statusid','Options'];
  dataSource = '';

}
