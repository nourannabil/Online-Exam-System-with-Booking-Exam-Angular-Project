import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAboutUsComponent } from './manage-about-us/manage-about-us.component';
import { ManageContactUsComponent } from './manage-contact-us/manage-contact-us.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { ManageExamsComponent } from './manage-exams/manage-exams.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { ManageQuestionBankComponent } from './manage-question-bank/manage-question-bank.component';
import { ManageTestimonialComponent } from './manage-testimonial/manage-testimonial.component';
import { ManageTimesComponent } from './manage-times/manage-times.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path: 'sidebar',
    component: SidebarComponent
  },
  {
    path: 'manageCourses',
    component: ManageCoursesComponent
  },
  {
    path: 'manageExams',
    component: ManageExamsComponent
  },
  {
    path: 'manageTimes',
    component: ManageTimesComponent
  },
  {
    path: 'manageQuestionBank',
    component: ManageQuestionBankComponent
  },
  {
    path: 'contactinfo',
    component: ManageContactUsComponent
  },
  {
    path: 'aboutinfo',
    component: ManageAboutUsComponent
  },
  {
    path: 'homeinfo',
    component: ManageHomeComponent
  },
  {
    path: 'testimonialinfo',
    component: ManageTestimonialComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
