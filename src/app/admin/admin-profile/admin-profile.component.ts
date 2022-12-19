import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  constructor(public userService: UserService,private Route: Router) { }

  user: any
  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    this.userService.MyProfile(this.user.Userid)
  }

  GoToEdit(obj:any){
    this.userService.preuserdata={
      imagepath:obj.imagepath
    }
    this.Route.navigate(['admin/adminEditProfile']);
    this.userService.MyProfile(this.user.Userid)
  }
}
