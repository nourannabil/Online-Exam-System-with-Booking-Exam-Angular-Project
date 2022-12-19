import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-exam-login',
  templateUrl: './exam-login.component.html',
  styleUrls: ['./exam-login.component.css']
})
export class ExamLoginComponent implements OnInit {

  exampassword = new FormControl('', Validators.required);

  passwordValue = false;
  user: any;
  loginExam: any;

  constructor(private Route: Router, public userService: UserService) { }


  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    this.userService.MyBooking(this.user.Userid)

    this.loginExam = this.userService.mySingleBooking.map((item: any) => {
      const { exampassword } = item;
      return { exampassword }
    });

    // هدول ما بدي ياهم انا كنت بجرب طباعة فقط
    // const pass = this.userService.mySingleBooking.map((item: any) => {
    //   const { examduration } = item;
    //   return { examduration }
    // });
    // Object.keys(pass).forEach((i: any) => {
    //   console.log(`${pass[i].examduration}`)
    // });

  }

  Check() {
    Object.keys(this.loginExam).forEach((i: any) => {
      console.log(`${this.loginExam[i].exampassword}`)
      if (this.exampassword.value == `${this.loginExam[i].exampassword}`) {
        this.passwordValue = true;
        this.Route.navigate(['quiz/examPaper']);
        console.log('valid');
      } else {
        document.getElementById("error")!.innerHTML = "Password is incorrect";
        console.log('not Valid')
      }
    })
  }

  GoToProfile() {
    this.Route.navigate(['user/myBooking'])
  }
}
