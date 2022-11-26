import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';
import { MatDialog } from '@angular/material/dialog';
import {ErrorStateMatcher} from '@angular/material/core';
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
    statusid:new FormControl('',Validators.required),
 
    })



  ngOnInit(): void {
   
  }
 statusIds:any[]=this.admin.status.filter((x)=>x.statusid==5 || x.statusid==6)
 

  saveData(){
    debugger
    this.admin.createBooking(this.createForm.value);
    this.dialog.closeAll();
  }
  closedialoge(){
    this.dialog.closeAll();
    console.log(this.statusIds);
    
  
  }
}
