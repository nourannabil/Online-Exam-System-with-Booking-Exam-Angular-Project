import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AuthorizationGuard } from './authorization.guard';
import { ContactusComponent } from './contactus/contactus.component';
import { CourseExamsComponent } from './course-exams/course-exams.component';
import { CoursesComponent } from './courses/courses.component';
import { EaxamInfoCardComponent } from './eaxam-info-card/eaxam-info-card.component';
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
  },{
    path: 'examinfo',
    component: EaxamInfoCardComponent
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
    loadChildren: () => AdminModule,
    canActivate:[AuthorizationGuard]
  },
  {
    path: 'user',
    loadChildren: () => UserModule,
    canActivate:[AuthorizationGuard]
  },
  {
    path: 'contactinfo',
    loadChildren: () => AdminModule
  },
  {
    path: 'aboutinfo',
    loadChildren: () => AdminModule
  },
  {
    path: 'homeinfo',
    loadChildren: () => AdminModule
  },
  {
    path: 'testimonialinfo',
    loadChildren: () => AdminModule
  },
  {
    path: 'bookinginfo',
    loadChildren: () => AdminModule
  },
  {
    path: 'certificate',
    loadChildren: () => AdminModule
  },
  {
    path: 'role',
    loadChildren: () => AdminModule
  },
  {
    path: 'users',
    loadChildren: () => AdminModule
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
