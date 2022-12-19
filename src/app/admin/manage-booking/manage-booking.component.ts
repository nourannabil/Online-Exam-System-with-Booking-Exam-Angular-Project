import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinner } from 'ngx-spinner';
import { CreateBookingComponent } from '../create-booking/create-booking.component';
import { AdminService } from 'src/app/Services/admin.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {
// newexams:any={};
  dateFrom?:string='';
  dateTo?:string='';

  constructor(public admin: AdminService, private dialog: MatDialog, private filter: Ng2SearchPipeModule) { }
  pDataBookUpdata: any = {};

  updateForm: FormGroup = new FormGroup({
    bookingid: new FormControl('', Validators.required),
    examdateuser: new FormControl('', Validators.required),
    bookingdate: new FormControl('', Validators.required),
    exampassword: new FormControl('', Validators.required),
    examid: new FormControl('', Validators.required),
    userid: new FormControl('', Validators.required),
    statusid: new FormControl('', Validators.required),
  })
  @ViewChild('callUpdateDailog') callUpdateDailog!: TemplateRef<any>
  @ViewChild('callDeleteDialog') callDeleteDialog!: TemplateRef<any>
  ngOnInit(): void {
    this.admin.getAllBooking();
    this.admin.getAllExams();
    this.admin.getAllStatus();
    this.admin.GetAllUsers();
  }

  statusIds: any[] = [];
  displayedColumns: string[] = ['bookingid', 'examdateuser', 'bookingdate', 'exampassword', 'examid', 'username', 'userid', 'statusid', 'Options'];
  dataSource = '';

  //to display select list to status
  openCreateDailog() {
    this.dialog.open(CreateBookingComponent);
  }

  openUpdateDialog(obj: any) {
    // debugger
    this.pDataBookUpdata = {
      bookingid: obj.bookingid,
      examdateuser: obj.examdateuser,
      bookingdate: obj.bookingdate,
      exampassword: obj.exampassword,
      examid: obj.examid,
      userid: obj.userid,
      statusid: obj.statusid,
    }

    // this.newexams=this.admin.exams.filter((x)=>x.examid==obj.examid)
    this.statusIds = this.admin.status.filter((x) => x.statusid == 5 || x.statusid == 6)
    this.updateForm.controls['bookingid'].setValue(this.pDataBookUpdata.bookingid); //to save id from updated
    this.updateForm.controls['bookingdate'].setValue(this.pDataBookUpdata.bookingdate);
    this.updateForm.controls['exampassword'].setValue(this.pDataBookUpdata.exampassword);
    // this.updateForm.controls['examid'].setValue(this.pDataBookUpdata.examid);
    // this.updateForm.controls['statusid'].setValue(this.pDataBookUpdata.statusid);
    this.dialog.open(this.callUpdateDailog);
    console.log(this.statusIds);

  }
  saveData() {
    // debugger
    this.admin.updateBooking(this.updateForm.value)
    this.dialog.closeAll();

  }
  closeDialog() {
    this.dialog.closeAll();
  }


  openDeleteDialog(id: number) {

    const dailogRef = this.dialog.open(this.callDeleteDialog);
    dailogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        debugger
        if (result == 'yes') {
          this.admin.deleteBooking(id);
        }
        else if (result == 'no')
          console.log("thank you!");
      }
    })
  }

  //===============Search Functions====================

  searchDateFrom(ev: any) {
    this.dateFrom = ev.target.value
    console.log(ev.target.value);
  }
  searchDateTo(ev: any) {
    this.dateTo = ev.target.value
    console.log(ev.target.value);
  }

  submit() {
    if ((this.dateFrom == '' ) && (this.dateTo == '' ) ) {
      this.admin.getAllBooking();
      this.admin.getAllExams();
      this.admin.getAllStatus();
      this.admin.GetAllUsers();
    }else if ((this.dateFrom == '' ) && (this.dateTo != '' )) {
      this.admin.SearchBetweenDates('%20', this.dateTo)
    }else if ((this.dateFrom != '' ) && (this.dateTo == '' )) {
      this.admin.SearchBetweenDates(this.dateFrom, '%20')
    }else if ((this.dateFrom != '' ) && (this.dateTo != '' ))  {
      this.admin.SearchBetweenDates(this.dateFrom, this.dateTo)
    }
  }
}
