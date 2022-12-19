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
import {MatDialogModule} from '@angular/material/dialog';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { ManageCertificateComponent } from './manage-certificate/manage-certificate.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StatisticsComponent } from './statistics/statistics.component';
import { ChartsComponent } from './charts/charts.component';
import { CreateCoursesComponent } from './create-courses/create-courses.component';
import { CreateExamsComponent } from './create-exams/create-exams.component';
import { ManageLoginComponent } from './manage-login/manage-login.component';
import { ReportComponent } from './report/report.component';
import { InboxComponent } from './inbox/inbox.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminEditprofileComponent } from './admin-editprofile/admin-editprofile.component';


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
    ManageQuestionBankComponent,
    CreateBookingComponent,
    ManageCertificateComponent,
    ManageRoleComponent,
    ManageUsersComponent,
    StatisticsComponent,
    ChartsComponent,
    CreateCoursesComponent,
    CreateExamsComponent,
    ManageLoginComponent,
    ReportComponent,
    InboxComponent,
    AdminProfileComponent,
    AdminEditprofileComponent,
  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatDialogModule,
    Ng2SearchPipeModule,

  ]
})
export class AdminModule { }
