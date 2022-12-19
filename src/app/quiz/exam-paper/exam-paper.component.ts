import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/Services/quiz.service';
import { UserService } from 'src/app/Services/user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-exam-paper',
  templateUrl: './exam-paper.component.html',
  styleUrls: ['./exam-paper.component.css']
})
export class ExamPaperComponent implements OnInit {

  userObject = localStorage.getItem('user')! || '';
  userInfo = JSON.parse(this.userObject);

  certifiecateForm: FormGroup = new FormGroup({
    title: new FormControl('PROFESSIONAL CERTIFICATE'),
    description: new FormControl('In recognition of passing the'),
    userid: new FormControl(parseInt(this.userInfo.Userid)),
    bookingid: new FormControl()
  })

  FalidForm: FormGroup = new FormGroup({
    title: new FormControl('Falid'),
    description: new FormControl('In recognition of Falid the'),
    userid: new FormControl(parseInt(this.userInfo.Userid)),
    bookingid: new FormControl()
  })

  constructor(public Quiz: QuizService, public userService: UserService, public Route: Router) {
  }

  user: any;
  time: number = 0; //1000
  timeOut: number = 0; // duration
  timer: string = '';
  timer2: any;
  clock: string = '';


  ngOnInit(): void {
    if (parseInt(localStorage.getItem('seconds')!) > 0) {
      this.Route.navigate(['']);
      localStorage.removeItem('seconds');
    } else {
      this.startTimer();
      this.endTime();
    }

    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    console.log(this.user.Userid)
    this.userService.MyBooking(this.user.Userid);

    const bookingNum = this.userService.mySingleBooking.map((item: any) => {
      const { bookingid } = item;
      return { bookingid }
    });

    Object.keys(bookingNum).forEach((i: any) => {
      this.certifiecateForm.controls['bookingid'].setValue(parseInt(bookingNum[i].bookingid))
      this.FalidForm.controls['bookingid'].setValue(parseInt(bookingNum[i].bookingid))
    });
  }

  PreviousQuestion() {
    this.Quiz.QuestionNumber--;
  }

  NextQuestion() {
    this.Quiz.QuestionNumber++;
  }

  FinalSubmit() {
    this.Quiz.FinalSubmit();
    this.stopInterval();

    const pass = this.userService.mySingleBooking.map((item: any) => {
      const { passmark } = item;
      return { passmark }
    });

    Object.keys(pass).forEach((i: any) => {
      console.log(`${pass[i].passmark}`)
      if ((this.Quiz.result) * 2 >= pass[i].passmark) {

        this.userService.CreateCertifiecate(this.certifiecateForm.value);

        this.Route.navigate(['quiz/pass']);
      } else {

        this.userService.CreateFalidCertifiecate(this.FalidForm.value);

        this.Route.navigate(['quiz/failed']);
      }
    });
  }


  ////For Timer ////////////////////////////////////////////
  startTimer() {
    this.timer2 = setInterval(() => {
      this.time++;
      localStorage.setItem('seconds', this.time.toString());
      this.displayOnWindow2();
      this.display();   // هاد ما بدي ياه بعدين فقط للاختبار
      this.clock = Math.floor(this.time / 3600) + ":" + Math.floor(this.time / 60) + ":" +
        Math.floor((this.time % 60) + 1);
      return this.clock;
    }, 1000);

    const RunTime = this.userService.mySingleBooking.map((item: any) => {
      const { examduration } = item;
      return { examduration }
    });

    Object.keys(RunTime).forEach((i: any) => {
      console.log(`${RunTime[i].examduration}`);
      console.log(`${RunTime[i].examduration * 60000}`);

      this.timeOut = (RunTime[i].examduration * 60000);
      // console.log(`this.timeOut ::: ${this.timeOut}`);
    });

  }

  stopInterval() {
    clearInterval(this.timer2);
    console.log('Stop The Interval');
  }

  // هاد ما بدي ياه بعدين فقط للاختبار
  display() {
    this.timer = Math.floor(this.time / 3600) + ":" + Math.floor(this.time / 60) + ":" + Math.floor(this.time % 60);
    return console.log('This is timer ' + ' ' + `${this.timer}`);
  }
  // ////////////////////////////////////////////////////////////

  displayOnWindow2() {
    this.timer = Math.floor(this.time / 3600) + ":" + Math.floor(this.time / 60) + ":" + Math.floor(this.time % 60);
    return this.timer;
  }

  endTime() {
    setTimeout(() => {
      console.log(this.time);
      console.log(this.timeOut);
      console.log(this.clock);

      if ((this.time) == (this.timeOut / 1000)) {
        this.submit()
      }
    }, this.timeOut);
  }

  submit() {
    this.FinalSubmit();
    console.log('timer' + ' ' + `${this.timer2}`)
  }

}
