import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ExamPaperComponent } from './exam-paper/exam-paper.component';
import { PassComponent } from './pass/pass.component';
import { FailedComponent } from './failed/failed.component';
import { ExamLoginComponent } from './exam-login/exam-login.component';


@NgModule({
  declarations: [
    ExamPaperComponent,
    PassComponent,
    FailedComponent,
    ExamLoginComponent,
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    SharedModule
    ]
})
export class QuizModule { }
