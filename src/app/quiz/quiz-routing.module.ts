import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamLoginComponent } from './exam-login/exam-login.component';
import { ExamPaperComponent } from './exam-paper/exam-paper.component';
import { FailedComponent } from './failed/failed.component';
import { PassComponent } from './pass/pass.component';

const routes: Routes = [
  {
    path: 'examPaper',
    component: ExamPaperComponent
  },
  {
    path: 'pass',
    component: PassComponent
  },
  {
    path: 'failed',
    component: FailedComponent
  },
  {
    path: 'examLogin',
    component: ExamLoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
