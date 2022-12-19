import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

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
    this.Route.navigate(['user/userEditProfile']);
    this.userService.MyProfile(this.user.Userid)
  }
}
