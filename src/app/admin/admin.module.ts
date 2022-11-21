import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ManageExamsComponent } from './manage-exams/manage-exams.component';
import { ManageContactUsComponent } from './manage-contact-us/manage-contact-us.component';
import { ManageAboutUsComponent } from './manage-about-us/manage-about-us.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { ManageTestimonialComponent } from './manage-testimonial/manage-testimonial.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageTimesComponent } from './manage-times/manage-times.component';
import { ManageQuestionBankComponent } from './manage-question-bank/manage-question-bank.component';


@NgModule({
  declarations: [
    ManageCoursesComponent,
    SidebarComponent,
    ManageExamsComponent,
    ManageContactUsComponent,
    ManageAboutUsComponent,
    ManageHomeComponent,
    ManageTestimonialComponent,
    ManageBookingComponent,
    ManageTimesComponent,
    ManageQuestionBankComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
