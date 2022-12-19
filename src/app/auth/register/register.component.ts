import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  createForm: FormGroup = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    imagepath: new FormControl(''),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });


  constructor(private spinner: NgxSpinnerService, private route: Router, private admin: AdminService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getLogins();
  }

  uploadFile(file: any) {
    debugger
    if (file.length == 0)
      return;
    let fileToUpload = <File>file[0]//the first image
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name)
    this.auth.uploadAttachment(formdata);
  }

  submit() {
    const newuser = {
      fname: this.createForm.controls['fname'].value,
      lname: this.createForm.controls['lname'].value,
      email: this.createForm.controls['email'].value,
      imagepath: this.createForm.controls['imagepath'].value,
      username: this.createForm.controls['username'].value,
      password: this.createForm.controls['password'].value,
    }
    this.auth.CreateUsers(newuser);
  }

  matchError() {
    if (this.createForm.controls['password'].value ==
      this.createForm.controls['confirmPassword'].value)
      this.createForm.controls['confirmPassword'].setErrors(null);
    else
      this.createForm.controls['confirmPassword'].setErrors({ mismatch: true });
  }

  goToLogin() {
    this.route.navigate(['security/login']);
  }


  DuplicateUserName(ev:any) {
    this.auth.CheckUsername(ev.target.value);
    if(this.auth.usernameChecked.length>0){
      this.createForm.controls['username'].setErrors({ DuplicateUserName: true })
    }
    else{
      this.createForm.controls['username'].setErrors(null)
    }
  }

  DuplicalteUserEmail(ev:any){
    this.auth.CheckUserEmail(ev.target.value);
    if(this.auth.userEmailChecked.length>0){
      this.createForm.controls['email'].setErrors({ DuplicateUserEmail: true })
    }
    else{
      this.createForm.controls['email'].setErrors(null)
    }
  }
}
