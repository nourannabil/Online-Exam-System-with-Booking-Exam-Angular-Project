import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router) { }

  userRole: any;
  ngOnInit(): void {
    let user: any = localStorage.getItem('user');
    console.log(('user.Roleid'))
    user = JSON.parse(user);
    console.log(JSON.parse(user.Roleid));
    this.userRole = JSON.parse(user.Roleid);
    ////////////////////////////////////////////////////////////
    const token = localStorage.getItem('token');
    if (token) {
      let user: any = localStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        if (user.Roleid == 1) {
          document.getElementsByClassName("login")[0]!.innerHTML = "My Profile";
          document.getElementsByClassName("Register")[0]!.innerHTML = "LogOut";
        } else if (user.Roleid == 2) {
          document.getElementsByClassName("login")[0]!.innerHTML = "My Profile";
          document.getElementsByClassName("Register")[0]!.innerHTML = "LogOut";
        }
      }
    } else {
      document.getElementsByClassName("login")[0]!.innerHTML = "Login";
      document.getElementsByClassName("Register")[0]!.innerHTML = "Register";
    }
  }

  start() {
    localStorage.clear();
    this.route.navigate(['security/login'])
  }

  // Go() {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     let user: any = localStorage.getItem('user');
  //     if (user) {
  //       user = JSON.parse(user);
  //       if (user.Roleid == 1) {
  //         this.route.navigate(['admin/sidebar'])
  //       } else if (user.Roleid == 2) {
  //         this.route.navigate(['user/sidebarUser'])
  //       }
  //     }
  //   } else {
  //     this.route.navigate(['security/login'])
  //   }
  // }

  // start() {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     let user: any = localStorage.getItem('user');
  //     if (user) {
  //       user = JSON.parse(user);
  //       if (user.Roleid == 1) {
  //         localStorage.clear();
  //         this.route.navigate(['security/login'])
  //       } else if (user.Roleid == 2) {
  //         localStorage.clear();
  //         this.route.navigate(['security/login'])
  //       }
  //     }
  //   } else {
  //     this.route.navigate(['security/register'])
  //   }
  // }

}
