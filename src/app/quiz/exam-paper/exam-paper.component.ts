import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/Services/quiz.service';

@Component({
  selector: 'app-exam-paper',
  templateUrl: './exam-paper.component.html',
  styleUrls: ['./exam-paper.component.css']
})
export class ExamPaperComponent implements OnInit {

  time: number = 0; //1000
  timeOut: number = 10000; // duration
  timer: string = '';
  timer2: any;
  clock: string = '';

  timeForLocalStorge: number = 0;

  constructor(public Quiz: QuizService, public Route: Router) { }

  ngOnInit(): void {


    if (parseInt(localStorage.getItem('seconds')!) > 0) {
      this.Route.navigate(['']);
      localStorage.removeItem('seconds');
    } else {
      this.startTimer();
      this.endTime();
    }
  }

  // just for testing
  // see() {
  //   console.log(this.ExamService.Exam);
  //   console.log(this.ExamService.newExam);
  // }

  PreviousQuestion() {
    this.Quiz.QuestionNumber--;
  }

  NextQuestion() {
    this.Quiz.QuestionNumber++;
  }

  FinalSubmit() {
    this.Quiz.FinalSubmit();
    this.stopInterval();

    if ((this.Quiz.result) * 2 >= 2) { // static date 80 for 50 question Or 8 for 20 question
      this.Route.navigate(['quiz/pass']);
    } else {
      this.Route.navigate(['quiz/failed']);
    }
  }


  ////For Timer ////////////////////////////////////////////
  startTimer() {
    this.timer2 = setInterval(() => {
      this.time++;
      this.timeForLocalStorge++;
      localStorage.setItem('seconds', this.time.toString());
      this.displayOnWindow2();
      this.display();   // هاد ما بدي ياه بعدين فقط للاختبار
      this.clock = Math.floor(this.time / 3600) + ":" + Math.floor(this.time / 60) + ":" +
        Math.floor((this.time % 60) + 1);
      return this.clock;
    }, 1000);
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

      var minutes = this.time // 10
      var afterSomeMinutes = new Date(new Date().getTime() + minutes * 1000);
      console.log(afterSomeMinutes);

      var out = this.timeOut // 10000
      var Out2 = new Date(new Date().getTime() + ((out / 1000) * 1000));
      console.log(Out2);

      var Today = new Date(new Date().getTime());
      console.log(Today);

      // if (((afterSomeMinutes.getTime() == Out2.getTime()))) {
      //   this.submit();
      //   this.stopInterval();
      // }
      if ((this.time == this.timeOut / 1000)) {
        this.submit()
      }
    }, this.timeOut);
  }

  submit() {
    this.FinalSubmit();
    console.log('timer' + ' ' + `${this.timer2}`)
  }

}
