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
  pDataUser:any={};
  createForm:FormGroup=new FormGroup({
    // userid:new FormControl('',Validators.required),
    fname:new FormControl('',Validators.required),
    lname:new FormControl('',Validators.required),
    // phonenumber:new FormControl('',[Validators.required,Validators.maxLength(10)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    address:new FormControl('',Validators.required),
    imagepath:new FormControl(''),
    });

    
  updateForm:FormGroup=new FormGroup({
    userid:new FormControl('',Validators.required),
    fname:new FormControl('',Validators.required),
    lname:new FormControl('',Validators.required),
    phonenumber:new FormControl('',[Validators.required,Validators.maxLength(10)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    address:new FormControl('',Validators.required),
    imagepath:new FormControl(''),
    });

  constructor(public admin:AdminService,private dialog:MatDialog) { }

 @ViewChild('CallCreateDialog')CallCreateDialog!:TemplateRef<any>
 @ViewChild('callUpdateDailog')callUpdateDailog!:TemplateRef<any>
 @ViewChild('callDeleteDialog')callDeleteDialog!:TemplateRef<any>
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

// ==========  Update Functions=========

 openUpdateDialog(obj:any){
  this.pDataUser={
    userid:obj.userid,
    fname:obj.fname,
    lname:obj.lname,
    phonenumber:obj.phonenumber,
    email:obj.email,
    address:obj.address,
    imagepath:obj.imagepath,
  }
  this.updateForm.controls['userid'].setValue(this.pDataUser.userid)
  this.updateForm.controls['phonenumber'].setValue(this.pDataUser.phonenumber)
  
  this.updateForm.controls['imagepath'].setValue(this.pDataUser.imagepath)
  this.admin.display_image=this.updateForm.controls['imagepath'].value

  
  this.dialog.open(this.callUpdateDailog)
 }

 saveUpdateData(){
  this.admin.UpdateUsers(this.updateForm.value)
  this.dialog.closeAll();
 }
// ========== End Update Functions=========

// ========== Delete Functions=========

openDeleteDialog(id:number){
  const dialogRef=this.dialog.open(this.callDeleteDialog)
  dialogRef.afterClosed().subscribe((result)=>{
   if(result!=undefined)
   {
    if(result=='yes')
    {
      this.admin.DeleteUser(id);
    }
    if(result=='no')
    console.log("Thankyou!");
    
   }

  })

}
// ========== End Delete Functions=========
closeDialoge(){
  this.dialog.closeAll();
}
}
