
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../Services/home.service';
import { QuizService } from '../Services/quiz.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  @Input() courseid: number = 0;;
  @Input() name: string | undefined;
  @Input() description: string | undefined;
  @Input() imagepath: string | undefined;
  @Output() courseExam = new EventEmitter()

  constructor(private home: HomeService, private Route: Router, public Quiz: QuizService) { }

  ngOnInit(): void {
  }

  goToExams() {
    this.home.selectedCourse =
    {
      Image: this.imagepath,
      CourseName: this.name,
      Id: this.courseid

    }
    this.courseExam.emit();
  }


  StartExam(courseid: number) {
    this.Quiz.GetRandomQuestionsByCourseId(courseid);
    this.Route.navigate(['quiz/examLogin']);
  }
}
