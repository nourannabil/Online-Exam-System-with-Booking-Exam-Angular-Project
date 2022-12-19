import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../Services/home.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ThisReceiver } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-eaxam-info-card',
  templateUrl: './eaxam-info-card.component.html',
  styleUrls: ['./eaxam-info-card.component.css']
})
export class EaxamInfoCardComponent implements OnInit {
  bookingForm: FormGroup = new FormGroup({
    cardnumber: new FormControl('', Validators.required),
    cvc: new FormControl('', Validators.required),
    expirydate: new FormControl('', Validators.required),
    examdateuser: new FormControl('', Validators.required),
    examid: new FormControl('', Validators.required),
  })

  date: any;
  time: any;
  constructor(public home: HomeService, private router: Router, private dialog: MatDialog, private toastr: ToastrService) {
  }

  @ViewChild('CallCreateBooking') CallCreateBooking!: TemplateRef<any>
  @ViewChild('sorry') sorry!: TemplateRef<any>

  ngOnInit(): void {
    
    this.home.getAllAvailable();
    this.home.getAllVisa();
    var date = new Date().getTime()
    var dateFormat = new Date(date);
    // this.date = (dateFormat.getFullYear() +
    //   "-" + (dateFormat.getMonth() + 1) +
    //   "-" + dateFormat.getDate() +
    //   "T" + (dateFormat.getHours()) +
    //   ":" + dateFormat.getMinutes() +
    //   ":" + (dateFormat.getSeconds()));
    this.date = (dateFormat.getFullYear() +
    "-" + (dateFormat.getMonth() + 1));
    console.log(this.date);

  }

  goToBookingForm() {

    const token = localStorage.getItem('token');
    if (token) {
      let user: any = localStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        if (user.Roleid == 1) {
          this.toastr.warning('your not user')
          this.router.navigate(['examinfo'])
        } else if (user.Roleid == 2) {
          this.dialog.open(this.CallCreateBooking)
        }
      }
    } else {
      this.toastr.warning('please login')
      this.router.navigate(['security/login'])
    }
  }

  closeDialoge() {
    this.dialog.closeAll();
  }
  soryDialog() {
    this.dialog.open(this.sorry)
  }
  saveBooking() {
   
    var dateFormat = new Date(this.bookingForm.controls['expirydate'].value);
    if(dateFormat.getUTCDate()>=10){
      var visaExpiryDate = (dateFormat.getFullYear() +
      "-" + (dateFormat.getMonth() + 1) +
      "-" + dateFormat.getUTCDate()+
      "T00" +
      ":00" +
      ":00"
      );
      console.log("more than 10");
      
    }
    else{
      var visaExpiryDate = (dateFormat.getFullYear() +
      "-" + (dateFormat.getMonth() + 1) +
      "-0" + dateFormat.getUTCDate()+
      "T00" +
      ":00" +
      ":00"
      );
      
      console.log("less than 10");
    }

    
  console.log("visaExpiryDate", visaExpiryDate);
  var visabook=this.home.allvisas.filter((X)=>X.cardnumber==this.bookingForm.controls['cardnumber'].value
  && X.cvc==this.bookingForm.controls['cvc'].value && X.expirydate==visaExpiryDate)

  console.log("visabook",visabook);
  console.log("exam price",this.home.examById.examprice);
  
  

   if(visabook.length>0){
    console.log("visabalance",visabook[0].balance);
    if(visabook[0].balance>=this.home.examById.examprice){
          const examnum = this.bookingForm.controls['examid'].value
    this.dialog.closeAll();
    const token = localStorage.getItem('token');
    if (token) {
      let user: any = localStorage.getItem('user');
      if (user) {
        console.log(user.Userid);

        user = JSON.parse(user);
        if (user.Roleid == 1) {
          this.toastr.error('Hi Admin')
          this.dialog.closeAll();
          // this.router.navigate(['examinfo'])
        } else if (user.Roleid == 2) {
          const bookpar = {
            cardnumber: this.bookingForm.controls['cardnumber'].value,
            cvc: this.bookingForm.controls['cvc'].value,
            expirydate: this.bookingForm.controls['expirydate'].value,
            examdateuser: this.bookingForm.controls['examdateuser'].value,
            examid: examnum,
            userid: parseInt(user.Userid)
          }

          this.home.CreateBookingCycle(bookpar);
          console.log(examnum);
          console.log(bookpar);


        }
      }
    } else {
      this.router.navigate(['security/login'])
    }
    }
    else{
      this.toastr.warning("Sorry! Your Visa Balance Not Enough For Exam Price")
    }

   }
   else{
    this.toastr.warning("Sorry! Make sure from your visa")

   }




  }

}
