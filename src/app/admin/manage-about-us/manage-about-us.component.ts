import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-about-us',
  templateUrl: './manage-about-us.component.html',
  styleUrls: ['./manage-about-us.component.css']
})
export class ManageAboutUsComponent implements OnInit {
  pAboutData:any={};
 
  @ViewChild('CallCreateDialog')CallCreateDialog!:TemplateRef<any>
  @ViewChild('callUpdateDailog') callUpdateDailog!:TemplateRef<any>
  @ViewChild('callDeleteDialog') callDeleteDialog!:TemplateRef<any>

  createForm:FormGroup=new FormGroup({
    // userid:new FormControl('',Validators.required),
    title:new FormControl('',Validators.required),
    description1:new FormControl('',Validators.required),
    description2:new FormControl(''),
    imagepath:new FormControl(''),
    });
    updateForm:FormGroup=new FormGroup({
      aboutid:new FormControl('',Validators.required),
      title:new FormControl('',Validators.required),
      description1:new FormControl('',Validators.required),
      description2:new FormControl(''),
      imagepath:new FormControl(''),
      });
 

  constructor(public home:HomeService,public admin:AdminService,private dialog:MatDialog) { }
 
  ngOnInit(): void {
    this.home.getAllabout();
  }
  displayedColumns: string[] = ['aboutid','title','description1','description2','imagepath','homeid','Options'];
  dataSource = '';
   // ==========Create Functions=========
 openCreateDialog(){
  this.dialog.open(this.CallCreateDialog)
  }
 saveData(){
  debugger
  this.admin.CreateAboutUs(this.createForm.value);
  this.dialog.closeAll();
  }
 uploadFile(file:any){
  debugger
  if(file.length==0)
  return;
  let fileToUpload=<File>file[0]//the first image
  const formdata=new FormData();
  formdata.append('file',fileToUpload,fileToUpload.name)
  this.admin.uploadAboutAttachment(formdata);
  }



 // ========== End Create Functions=========

// ======= Update Functions=======
openUpdateDialog(obj:any){
  
  this.pAboutData={
    aboutid:obj.aboutid,
    title:obj.title,
    description1:obj.description1,
    description2:obj.description2,
    imagepath:obj.imagepath,
  }
  this.updateForm.controls['aboutid'].setValue(this.pAboutData.aboutid);
  this.updateForm.controls['imagepath'].setValue(this.pAboutData.imagepath);
  this.admin.display_image=this.updateForm.controls['imagepath'].value;
  this.dialog.open(this.callUpdateDailog);
  }
  saveUpdateData(){
    this.admin.updateAbout(this.updateForm.value);
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
        this.admin.deleteAbout(id);
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