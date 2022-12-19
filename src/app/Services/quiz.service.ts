import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  Exam: any[] = [];
  newExam: any[] = [];
  QuestionNumber = 0;
  CorrectAnswerCount = 0;
  userAnswer: any[] = [];
  result = 0;


  constructor(private Http: HttpClient, private Spinner: NgxSpinnerService, private Tostar: ToastrService) { }

  GetRandomQuestionsByCourseId(courseId: number) {
    this.Spinner.show();
    this.Http.get('https://localhost:44324/api/QuestionBank/GetRandomQuestionsByCourseId/' + courseId).subscribe((resp: any) => {
      this.Exam = resp;
      this.newExam = this.Exam.map((item: any) => {
        return (item.options = [item.answeroption1, item.answeroption2, item.answeroption3, item.answeroption4])
      })
      console.log(this.Exam);

      this.Spinner.hide();
      this.Tostar.success('Data Retrived');
    }, err => {
      this.Spinner.hide()
      this.Tostar.error(err.message, err.statuse)
    })
  }

  FinalSubmit() {
    for (let item of this.answers.values()) {
      // console.log(item);
      this.userAnswer.push(item);
    }
    console.log(this.userAnswer);
    console.log("========================================")
    localStorage.setItem('userAnswers', `${this.userAnswer}`);
    this.checkAnswer();
  }

  answers = new Map<any, any>();
  answer(option: any, ind: number): void {
    this.answers.set(this.QuestionNumber, option);
    // localStorage.setItem('user', JSON.stringify([...this.answers]))
    console.log(this.answers);
  }


  allCorrectAnswer: any[] = []
  checkAnswer() {
    // destructring the object of exam to get only all the correct answer form each object
    this.allCorrectAnswer = this.Exam.map((item: any) => {
      const { correctanswer: userOption } = item;
      return { userOption }
    })
    console.log(this.allCorrectAnswer)
    // i will use it to get only the value without the key
    Object.keys(this.allCorrectAnswer).forEach((i: any) => {
      // جمل طباعة عشان اشوف الناتج
      // console.log(`${i} = ${this.allCorrectAnswer[i].userOption}`);
      // console.log(`${this.allCorrectAnswer[i].userOption}`)
      // console.log(this.userAnswer[i])

      if (`${this.allCorrectAnswer[i].userOption}` == this.userAnswer[i]) {
        this.CorrectAnswerCount++;
        console.log("counter increase");
      }
    })
    this.result = this.CorrectAnswerCount;
    console.log("The Final Result is " + " " + `${this.CorrectAnswerCount}`);
  }


  isChecked(option: any) {
    return this.answers.get(this.QuestionNumber) === option;
  }
}
