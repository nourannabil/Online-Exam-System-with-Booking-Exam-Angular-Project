import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-contact-us',
  templateUrl: './manage-contact-us.component.html',
  styleUrls: ['./manage-contact-us.component.css']
})
export class ManageContactUsComponent implements OnInit {
  pContactUsData:any={};
  @ViewChild('callDeleteDialog') callDeleteDialog!:TemplateRef<any>
  @ViewChild('callUpdateDailog') callUpdateDailog!:TemplateRef<any>
  constructor(public home:HomeService,public admin:AdminService,private dialog:MatDialog) { }

  updateForm:FormGroup=new FormGroup({
    contacttableid:new FormControl('',Validators.required),
    title:new FormControl('',Validators.required),
    description1:new FormControl('',Validators.required),
    description2:new FormControl('',Validators.required),
    description3:new FormControl('',Validators.required),
    map:new FormControl('',Validators.required),
    imagepath:new FormControl(''),
    });


  ngOnInit(): void {
    this.home.getAllContact();
    
  }
  displayedColumns: string[] = ['contacttableid','title','description1','description2','description3','map','homeid','imagepath','Options'];
  dataSource = '';


// ======= Update Functions=======
openUpdateDialog(obj:any){
  debugger
  this. pContactUsData={
    contacttableid:obj.contacttableid,
    title:obj.title,
    description1:obj.description1,
    description2:obj.description2,
    description3:obj.description3,
    map:obj.map,
    imagepath:obj.imagepath,
  }
  this.updateForm.controls['contacttableid'].setValue(this.pContactUsData.contacttableid);
  this.updateForm.controls['imagepath'].setValue(this.pContactUsData.imagepath);
  this.admin.display_image=this.updateForm.controls['imagepath'].value
  this.dialog.open(this.callUpdateDailog);
  }
  saveUpdateData(){
    this.admin.updateContact(this.updateForm.value);
    this.dialog.closeAll();
  }
  uploadFile(file:any){
    debugger
    if(file.length==0)
    return;
    let fileToUpload=<File>file[0]//the first image
    const formdata=new FormData();
    formdata.append('file',fileToUpload,fileToUpload.name)
    this.admin.uploadContactAttachment(formdata);
    }

  // =======  Delete Functions=======
  openDeleteDialog(id:number){
    
    const dailogRef=this.dialog.open(this.callDeleteDialog);
  
    dailogRef.afterClosed().subscribe((result)=>{
      if(result!=undefined)
      {
        debugger
        if(result=='yes')
        {
        this.admin.deletecontact(id);
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