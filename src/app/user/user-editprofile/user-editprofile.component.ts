import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-editprofile',
  templateUrl: './user-editprofile.component.html',
  styleUrls: ['./user-editprofile.component.css']
})
export class UserEditprofileComponent implements OnInit {

  UpdateForm: FormGroup = new FormGroup({
    userid: new FormControl(),
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    phonenumber: new FormControl('', [Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(),
    imagepath: new FormControl(),
  })
  editLogin: FormGroup = new FormGroup({
    loginid:new FormControl('',Validators.required),
    username:new FormControl('',Validators.required),
    password:new FormControl('',[Validators.required, Validators.minLength(8)]),
    roleid:new FormControl('',Validators.required),
    userid:new FormControl('',Validators.required),


  })

  constructor(public userService: UserService, private Route: Router,public admin:AdminService) { }

  user: any

  ngOnInit(): void {
    this.admin.GetAllLogins();
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    this.userService.MyProfile(this.user.Userid);
    this.admin.GetPass();
    this.UpdateForm.controls['imagepath'].setValue(this.userService.preuserdata[0].imagepath)
    
  }
  SaveData() {
    
    this.user.display_image = this.UpdateForm.controls['imagepath'].value;
    this.admin.GetPass();

    this.admin.userPass[0].password=this.editLogin.controls['password'].value;
    console.log("userPass");
    console.log(this.admin.userPass[0]);

    console.log(this.UpdateForm.value);
    this.admin.UpdateLogins(this.admin.userPass[0])
    this.userService.EditProfile(this.UpdateForm.value)
  }

  uploadFile(file: any) {
    if (file.length == 0)
      return;
    let fileToUpload = <File>file[0]//the first image
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
    this.userService.UserImage(formdata);
  }

  Cancel() {
    this.Route.navigate(['user/userProfile'])
  }
}
