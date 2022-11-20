import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-login',
  templateUrl: './exam-login.component.html',
  styleUrls: ['./exam-login.component.css']
})
export class ExamLoginComponent implements OnInit {

  exampassword = new FormControl('', Validators.required);

  passwordValue = false;

  constructor(private Route:Router) { }

  ngOnInit(): void {
  }

  Check() {
    if (this.exampassword.value == '1234') {
      // MyBooking  يلي جاي من ال  exampassword بدل 1234 رح نحط ال
      this.passwordValue = true;
      this.Route.navigate(['quiz/examPaper']);
      console.log('valid');
    } else {
      document.getElementById("error")!.innerHTML = "Password is incorrect";
      console.log('not Valid')
    }
  }

  GoToProfile() {
    // MyBooking رح اخليه يرجع على صفحة اليوزر تبعت
  }
}
