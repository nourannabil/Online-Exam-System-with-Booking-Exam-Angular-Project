import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinner } from 'ngx-spinner';
import { CreateBookingComponent } from '../create-booking/create-booking.component';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {
 
  constructor(public admin:AdminService,private dialog:MatDialog) { }
  pDataBookUpdata:any={};
 
  updateForm:FormGroup=new FormGroup({
    bookingid:new FormControl('',Validators.required),
    examdateuser:new FormControl('',Validators.required),
    bookingdate:new FormControl('',Validators.required),
    exampassword:new FormControl('',Validators.required),
    examid:new FormControl('',Validators.required),
    userid:new FormControl('',Validators.required),
    statusid:new FormControl('',Validators.required),
 
    })
   @ViewChild('callUpdateDailog') callUpdateDailog!:TemplateRef<any>
   @ViewChild('callDeleteDialog') callDeleteDialog!:TemplateRef<any>
  ngOnInit(): void {
   this.admin.getAllBooking();
  //  this.admin.getAllExams();
  //  this.admin.getAllStatus();
  }

  
  displayedColumns: string[] = ['bookingid','examdateuser','bookingdate','exampassword','examid','userid','statusid','Options'];
  dataSource = '';
 

  openCreateDailog(){
    // this.dialog.open(this.callCreateBooking);
    this.dialog.open(CreateBookingComponent);
  }
 
  openUpdateDialog(obj:any){
    this.pDataBookUpdata={
      bookingid:obj.bookingid,
      examdateuser:obj.examdateuser,
      bookingdate:obj.bookingdate,
      exampassword:obj.exampassword,
      examid:obj.examid,
      userid:obj.userid,
      statusid:obj.statusid,
    }

    this.updateForm.controls['bookingid'].setValue(this.pDataBookUpdata.bookingid); //to save id from updated
   
     this.dialog.open(this.callUpdateDailog);

  }
  saveData(){
    debugger
    this.admin.updateBooking(this.updateForm.value)
    this.dialog.closeAll();
   
  }
  closeDialog(){
    this.dialog.closeAll();
  }


  openDeleteDialog(id:number)
  {
    
  const dailogRef=this.dialog.open(this.callDeleteDialog);
  dailogRef.afterClosed().subscribe((result)=>{
    if(result!=undefined)
    {
      debugger
      if(result=='yes')
      {
      this.admin.deleteBooking(id);
      }
      else if(result=='no')
      console.log("thank you!");
      

    }
  })
  }

}
