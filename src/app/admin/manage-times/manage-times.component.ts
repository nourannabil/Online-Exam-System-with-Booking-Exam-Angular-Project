import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';


@Component({
  selector: 'app-manage-times',
  templateUrl: './manage-times.component.html',
  styleUrls: ['./manage-times.component.css']
})
export class ManageTimesComponent implements OnInit {

  constructor(public Home:HomeService,public Admin : AdminService , private dialog: MatDialog) { }

  @ViewChild('callCreateDialog') callCreateDialog!: TemplateRef<any>
  @ViewChild('callUpdateDialog') callUpdateDialog!: TemplateRef<any>
  @ViewChild('callDeleteDailog') callDeleteDialog!:TemplateRef<any>

  createForm: FormGroup = new FormGroup({
    examstartdate: new FormControl('', Validators.required),
    examid: new FormControl('', Validators.required),
  })

  updateForm: FormGroup = new FormGroup({
    avaliableid: new FormControl(),
    examstartdate: new FormControl('', Validators.required),
    examid: new FormControl('', Validators.required),
    statusid: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.Admin.getAllExams();
    this.Home.getAllExams();

    this.Admin.getStatus();
    this.Admin.getAllAvailableTime();
  }

  statusId:any[] = this.Admin.statustime.filter((x) => x.statusid == 3 || x.statusid == 4)

  openCreateDailog() {
    this.dialog.open(this.callCreateDialog);
  }

  Save() {
    this.Admin.createAvailableTime(this.createForm.value);
  }

  p_data: any = {};
  openUpdateDialog(element: any) {
    console.log(element);
    this.p_data = {
      avaliableid: element.avaliableid,
      examstartdate: element.examstartdate,
      examid: element.examid,
      statusid: element.statusid
    }
    this.updateForm.controls['avaliableid'].setValue(this.p_data.avaliableid);
    this.dialog.open(this.callUpdateDialog);
  }

  saveData() {
    this.Admin.UpdateAvailableTime(this.updateForm.value);
  }

  openDeleteDailog(id:number) {
    const dialogRef=  this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((result)=> {
      if(result!=undefined) {
        if(result=='yes') {
          this.Admin.deleteAvailableTime(id);
        }
          else if(result=='no')
          console.log('thank you ');
      }
    })
  }

  displayedColumns: string[] = ['position', 'name','description' ,'symbol' , 'Options'];
  dataSource = '';

}
