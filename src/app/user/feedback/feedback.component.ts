import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  user = localStorage.getItem('user')!;
  userNum = JSON.parse(this.user);

  CreateForm: FormGroup = new FormGroup({
    feedback: new FormControl('', Validators.required),
    statusid: new FormControl(2),
    userid: new FormControl(JSON.parse(this.userNum.Userid)),
    homeid: new FormControl(41)
  })

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  submit() {
    this.userService.CreateFeedBack(this.CreateForm.value);
  }
}
