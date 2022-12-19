import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-manage-certificate',
  templateUrl: './manage-certificate.component.html',
  styleUrls: ['./manage-certificate.component.css']
})
export class ManageCertificateComponent implements OnInit {
  pDataCertificateUpdata: any = {};
  createForm: FormGroup = new FormGroup({
    // certificateid:new FormControl('',Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    imagepath: new FormControl(''),
    userid: new FormControl('', Validators.required),
    bookingid: new FormControl('', Validators.required),
  });

  updateForm: FormGroup = new FormGroup({
    certificateid: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    imagepath: new FormControl(''),
    userid: new FormControl('', Validators.required),
    bookingid: new FormControl('', Validators.required),
  });

  @ViewChild('CallCreateDialog') CallCreateDialog!: TemplateRef<any>
  @ViewChild('callUpdateDailog') callUpdateDailog!: TemplateRef<any>
  @ViewChild('callDeleteDialog') callDeleteDialog!: TemplateRef<any>
  constructor(public admin: AdminService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.admin.GetAllCertificate();
    this.admin.GetAllUsers();
  }
  // ==========get all array "columns name"=========
  displayedColumns: string[] = ['certificateid', 'title', 'description', 'imagepath', 'userid', 'username', 'bookingid', 'Options'];
  dataSource = '';

  // ==========create functions=========
  openCreateDialog() {
    this.dialog.open(this.CallCreateDialog)
  }
  saveData() {
    this.admin.CreateCertificate(this.createForm.value);
    this.dialog.closeAll();
  }
  // ==========End create functions=========

  // ==========Update functions=========

  openUpdateDialog(obj: any) {

    this.pDataCertificateUpdata = {
      certificateid: obj.certificateid,
      title: obj.title,
      description: obj.description,
      imagepath: obj.imagepath,
      userid: obj.userid,
      bookingid: obj.bookingid,
    }
    this.updateForm.controls['certificateid'].setValue(this.pDataCertificateUpdata.certificateid);
    this.updateForm.controls['userid'].setValue(this.pDataCertificateUpdata.userid);
    this.updateForm.controls['bookingid'].setValue(this.pDataCertificateUpdata.bookingid);

    this.dialog.open(this.callUpdateDailog);
  }
  saveUpdateData() {
    debugger
    this.admin.UpdateCertificate(this.updateForm.value);
    this.dialog.closeAll();
  }

  // ==========End Update functions=========

  // ========== Delete functions=========
  openDeleteDialog(id: number) {

    const dailogRef = this.dialog.open(this.callDeleteDialog);

    dailogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        debugger
        if (result == 'yes') {
          this.admin.DeleteCertificate(id);
        }
        else if (result == 'no')
          console.log("thank you!");


      }
    })
  }

  // ========== End Delete functions=========
  closeDialoge() {
    this.dialog.closeAll();
  }
}
