import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-manage-login',
  templateUrl: './manage-login.component.html',
  styleUrls: ['./manage-login.component.css']
})
export class ManageLoginComponent implements OnInit {

  pLoginData:any={};
  roleIds:any[]=[];
  updateForm:FormGroup=new FormGroup({
    loginid:new FormControl('',Validators.required),
    username:new FormControl('',Validators.required),
    password:new FormControl('',[Validators.required, Validators.minLength(8)]),
    roleid:new FormControl('',Validators.required),
    userid:new FormControl('',Validators.required),
    })
    @ViewChild('callUpdateDailog') callUpdateDailog!:TemplateRef<any>

  constructor(public admin:AdminService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.admin.GetAllLogins();
    this.admin.GetAllRole();

  }
  displayedColumns: string[] = ['loginid','username','password','roleid','userid','Options'];
  dataSource = '';



  openUpdateDialog(obj:any){
    this.pLoginData={
      loginid:obj.loginid,
      username:obj.username,
      password:obj.password,
      roleid:obj.roleid,
      userid:obj.userid
    };

    this.updateForm.controls['loginid'].setValue(this.pLoginData.loginid);
    this.updateForm.controls['userid'].setValue(this.pLoginData.userid);
    this.updateForm.controls['password'].setValue(this.pLoginData.password);
    this.dialog.open(this.callUpdateDailog);
  }

  saveUpdateData(){
    this.admin.UpdateLogins(this.updateForm.value);
    this.dialog.closeAll();
  }
  closeDialoge(){
    this.dialog.closeAll();
  }

}
