import { Component, OnInit, TemplateRef , ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css']
})
export class ManageRoleComponent implements OnInit {
  pRoleData:any={};
  createForm:FormGroup=new FormGroup({
    // roleid:new FormControl('',Validators.required),
    rolename:new FormControl('',Validators.required),
    });

    updateForm:FormGroup=new FormGroup({
      roleid:new FormControl('',Validators.required),
      rolename:new FormControl('',Validators.required),
      });

    @ViewChild('CallCreateDialog') CallCreateDialog!:TemplateRef<any>
    @ViewChild('callUpdateDailog') callUpdateDailog!:TemplateRef<any>
    @ViewChild('callDeleteDialog') callDeleteDialog!:TemplateRef<any>
  constructor(public admin:AdminService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.admin.GetAllRole();
  }
  displayedColumns: string[] = ['roleid','rolename','Options'];
  dataSource = '';

  // =======Create Functions=======

  openCreateDialog(){
    this.dialog.open(this.CallCreateDialog);
  }
  saveData(){
    this.admin.CreateRole(this.createForm.value);
    this.dialog.closeAll();
  }
  // =======End Create Functions=======

 // ======= Update Functions=======
openUpdateDialog(obj:any){
this.pRoleData={
  roleid:obj.roleid,
  rolename:obj.rolename
}
this.updateForm.controls['roleid'].setValue(this.pRoleData.roleid);
this.dialog.open(this.callUpdateDailog);
}
saveUpdateData(){
  this.admin.UpdateRole(this.updateForm.value);
  this.dialog.closeAll();
}
// ======= End Update Functions=======

// =======  Delete Functions=======
openDeleteDialog(id:number){
  
  const dailogRef=this.dialog.open(this.callDeleteDialog);

  dailogRef.afterClosed().subscribe((result)=>{
    if(result!=undefined)
    {
      debugger
      if(result=='yes')
      {
      this.admin.DeleteRole(id);
      }
      else if(result=='no')
      console.log("thank you!");
    }
  })
}

//=======Shared function to cancel buttons======
  closeDialoge(){
    this.dialog.closeAll();
  }
}
