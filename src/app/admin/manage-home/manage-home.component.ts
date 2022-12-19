import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-home',
  templateUrl: './manage-home.component.html',
  styleUrls: ['./manage-home.component.css']
})
export class ManageHomeComponent implements OnInit {
  pHomeData:any={};
  @ViewChild('callDeleteDialog') callDeleteDialog!:TemplateRef<any>
  @ViewChild('callUpdateDailog') callUpdateDailog!:TemplateRef<any>

  updateForm:FormGroup=new FormGroup({
    homeid:new FormControl('',Validators.required),
    title:new FormControl('',Validators.required),
    description1:new FormControl('',Validators.required),
    description2:new FormControl('',Validators.required),
    description3:new FormControl(''),
    imagepath:new FormControl(''),
    });
  

  constructor(public home:HomeService,public admin:AdminService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.home.getAllhome();
  }
  displayedColumns: string[] = ['homeid','title','description1','description2','description3','imagepath','Options'];
  dataSource = '';

    // =======  Delete Functions=======
    openDeleteDialog(id:number){
    
      const dailogRef=this.dialog.open(this.callDeleteDialog);
    
      dailogRef.afterClosed().subscribe((result)=>{
        if(result!=undefined)
        {
          debugger
          if(result=='yes')
          {
          this.admin.deletehome(id);
          }
          else if(result=='no')
          console.log("thank you!");
        }
      })
    }
    // ======= Update Functions=======
openUpdateDialog(obj:any){
  
  this.pHomeData={
    homeid:obj.homeid,
    title:obj.title,
    description1:obj.description1,
    description2:obj.description2,
    description3:obj.description3,
    imagepath:obj.imagepath,
  }
  this.updateForm.controls['homeid'].setValue(this.pHomeData.homeid);
  this.updateForm.controls['imagepath'].setValue(this.pHomeData.imagepath);
  this.admin.display_image=this.updateForm.controls['imagepath'].value;
  this.updateForm.controls['description3'].setValue(this.pHomeData.description3);
  this.admin.display_image2=this.updateForm.controls['description3'].value;
  this.dialog.open(this.callUpdateDailog);
  }
  saveUpdateData(){
    this.admin.updateHome(this.updateForm.value);
    this.dialog.closeAll();
  }
  uploadFile(file:any){
    debugger
    if(file.length==0)
    return;
    let fileToUpload=<File>file[0]//the first image
    const formdata=new FormData();
    formdata.append('file',fileToUpload,fileToUpload.name)
    this.admin.uploadHomeAttachment(formdata);
    }


  // ======= End Update Functions=======
   //=======Shared function to cancel buttons======

closeDialoge(){
  this.dialog.closeAll();
}
}