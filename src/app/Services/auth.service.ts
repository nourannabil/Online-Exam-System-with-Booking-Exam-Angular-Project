import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private spinner: NgxSpinnerService ,public Toastr: ToastrService, public Route:Router, private http: HttpClient) { }

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
        this.Route.navigate(['admin/sidebar']);
      } else if (data.Roleid == 2) {
        this.Route.navigate(['user/sidebarUser']);
      }
    }, err => {
      this.Toastr.error(err.masseage, err.status);
    })
  }
}
