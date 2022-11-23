import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  createForm:FormGroup=new FormGroup({
    // userid:new FormControl('',Validators.required),
    fname:new FormControl('',Validators.required),
    lname:new FormControl('',Validators.required),
    phonenumber:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    address:new FormControl('',Validators.required),
    imagepath:new FormControl(''),
    });

  constructor(public admin:AdminService,private dialog:MatDialog) { }
 @ViewChild('CallCreateDialog')CallCreateDialog!:TemplateRef<any>
  ngOnInit(): void {
    this.admin.GetAllUsers();
  }
 // ==========get all array "columns name"=========
 displayedColumns: string[] = ['userid','fname','lname','phonenumber','email','address','imagepath','Options'];
 dataSource = '';

 // ==========Create Functions=========
 openCreateDialog(){
  this.dialog.open(this.CallCreateDialog)
  }
 saveData(){
  debugger
  this.admin.CreateUsers(this.createForm.value);
  this.dialog.closeAll();
  }
 uploadFile(file:any){
  debugger
  if(file.length==0)
  return;
  let fileToUpload=<File>file[0]//the first image
  const formdata=new FormData();
  formdata.append('file',fileToUpload,fileToUpload.name)
  this.admin.uploadAttachment(formdata);
  }



 // ========== End Create Functions=========

closeDialoge(){
  this.dialog.closeAll();
}
}
