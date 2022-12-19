import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaxLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  display_image: any;
  users: any[] = [];
  logins: any = [];
  usernameChecked: any[] = [];
  userEmailChecked: any[] = [];

  constructor(private spinner: NgxSpinnerService, public Toastr: ToastrService, public Route: Router, private http: HttpClient) { }

  submit(username: any, password: any, rememberMe: any) {

    // if (rememberMe.value == true) {
    //   localStorage.setItem("username", `${username.value}`);
    //   localStorage.setItem("password", `${password.value}`);
    // }

    var body = {
      username: username.value.toString(),
      password: password.value.toString()
    }
    const headerDic = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDic)
    }

    this.http.post('https://localhost:44324/api/JWT/Login/', body, requestOptions).subscribe((resp: any) => {
      const responce = {
        token: resp.toString()
      }
      localStorage.setItem('token', responce.token);
      let data: any = jwtDecode(responce.token);
      localStorage.setItem('user', JSON.stringify({ ...data }));
      if (data.Roleid == 1) {
        this.Route.navigate(['admin/']);
      } else if (data.Roleid == 2) {
        this.Route.navigate(['user/userProfile']);
      }
    }, err => {
      this.Toastr.error("username or password incorrect")
      // this.Toastr.error(err.masseage, err.status);
    })
  }

  //=======================Register users(regester)===========================

  uploadAttachment(file: FormData) {
    debugger
    this.http.post('https://localhost:44324/api/user/UplodeImage/', file).subscribe((resp: any) => {

      this.display_image = resp.imagepath;
    }, err => {
      this.Toastr.error('cant upload image')
      console.log(err);
    })
  }

  CreateUsers(body: any) {
    debugger
    body.imagepath = this.display_image
    this.spinner.show();
    this.http.post('https://localhost:44324/api/Register/Register/', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.Route.navigate(['security/login'])
      this.Toastr.success('Created Successfully!')
    }, err => {
      this.spinner.hide();
      this.Toastr.error(err.message, err.status)
    })
  }


  //===============================Login=========================
  getLogins() {
    this.spinner.show();
    this.http.get('https://localhost:44324/api/login').subscribe((resp: any) => {
      this.logins = resp;
      console.log(this.logins);
      this.spinner.hide();
      this.Toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.Toastr.error(err.message, err.status)
    })
  }

  //===============================Check Username=========================

  CheckUsername(username: string = '') {
    this.http.get('https://localhost:44324/Api/Register/CheckUserName/' + username).subscribe((resp: any) => {
      this.usernameChecked = resp;
      console.log(this.usernameChecked)
    }, err => {
      // this.spinner.hide();
      // this.Toastr.error(err.masseage, err.status);
    })
  }

  //===============================Check userEmail=========================

  CheckUserEmail(userEmail: string = '') {
    this.http.get('https://localhost:44324/Api/Register/CheckUserEmail/' + userEmail).subscribe((resp: any) => {
      this.userEmailChecked = resp;
    }, err => {
      // this.spinner.hide();
      // this.Toastr.error(err.masseage, err.status);
    })
  }

}

