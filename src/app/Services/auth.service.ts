import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route:Router,private spinner: NgxSpinnerService ,public Toastr: ToastrService, public Route:Router) { }

  submit(username: any, password: any, rememberMe: any) {

    if (rememberMe.value == true) {
      localStorage.setItem("username", `${username.value}`);
      localStorage.setItem("password", `${password.value}`);
    }

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000
    )

    console.log(username.value);
    console.log(password.value);
    console.log(rememberMe.value);

    this.Toastr.success('Sucssfully Logged in')

    this.Route.navigate(['admin/sidebar'])
  }


}
