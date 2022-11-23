import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {

  constructor(public admin:AdminService,private dialog:MatDialog) { }
  createForm:FormGroup=new FormGroup({
    // bookingid:new FormControl('',Validators.required),
    examdateuser:new FormControl(''),
    bookingdate:new FormControl(''),
    exampassword:new FormControl(''),
    examid:new FormControl('',Validators.required),
    userid:new FormControl('',Validators.required),
    statusid:new FormControl(''),
 
    })
  ngOnInit(): void {
  }
  saveData(){
    debugger
    this.admin.createBooking(this.createForm.value);
  }
  closedialoge(){
    this.dialog.closeAll();
  }
}
