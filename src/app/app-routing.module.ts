import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ContactusComponent } from './contactus/contactus.component';
import { CourseExamsComponent } from './course-exams/course-exams.component';
import { CoursesComponent } from './courses/courses.component';
import { ExamsComponent } from './exams/exams.component';
import { HomeComponent } from './home/home.component';
import { QuizModule } from './quiz/quiz.module';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { UserModule } from './user/user.module';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutusComponent
  },
  {
    path: 'contact',
    component: ContactusComponent
  }, {
    path: 'test',
    component: TestimonialComponent
  },
  //////////////////////////////////////
  {
    path: 'exams',
    component: ExamsComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'courseexams',
    component: CourseExamsComponent
  },

  //////For Another Modules//////////////
  {
    path: 'security',
    loadChildren: () => AuthModule
  },
  {
    path: 'quiz',
    loadChildren: () => QuizModule
  },
  {
    path: 'admin',
    loadChildren: () => AdminModule
  },
  {
    path: 'user',
    loadChildren: () => UserModule
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }