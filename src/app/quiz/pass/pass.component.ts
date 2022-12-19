import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.css']
})
export class PassComponent implements OnInit {


  constructor(public userService: UserService, public Route: Router) { }

  user: any;
  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    // console.log(parseInt(this.userInfo.Userid))
  }

  SeeCertificate() {
    this.Route.navigate(['user/myCertificate'])
  }

}
