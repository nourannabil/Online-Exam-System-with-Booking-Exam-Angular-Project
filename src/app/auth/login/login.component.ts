import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private route: Router,private Auth:AuthService) { }

  name = localStorage.getItem("username")! || '';
  userPass = localStorage.getItem("password")! || '';

  username: FormControl = new FormControl(`${this.name}`, [Validators.required]);
  password: FormControl = new FormControl(`${this.userPass}`, [Validators.minLength(8), Validators.required]);
  rememberMe = new FormControl();

  ngOnInit(): void {
  }

  submit() {
    this.Auth.submit(this.username,this.password,this.rememberMe)
  }

  goToRegister() {
    this.route.navigate(['security/register']);
  }
}

