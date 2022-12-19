import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageAboutUsComponent } from './manage-about-us/manage-about-us.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageCertificateComponent } from './manage-certificate/manage-certificate.component';
import { ManageContactUsComponent } from './manage-contact-us/manage-contact-us.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { ManageExamsComponent } from './manage-exams/manage-exams.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { ManageQuestionBankComponent } from './manage-question-bank/manage-question-bank.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ManageTestimonialComponent } from './manage-testimonial/manage-testimonial.component';
import { ManageTimesComponent } from './manage-times/manage-times.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { StatisticsComponent } from './statistics/statistics.component';
import { ChartsComponent } from './charts/charts.component';
import { CreateCoursesComponent } from './create-courses/create-courses.component';
import { CreateExamsComponent } from './create-exams/create-exams.component';
import { ManageLoginComponent } from './manage-login/manage-login.component';
import { ReportComponent } from './report/report.component';
import { InboxComponent } from './inbox/inbox.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminEditprofileComponent } from './admin-editprofile/admin-editprofile.component';

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
  {
    path: 'bookinginfo',
    component: ManageBookingComponent
  },
  {
    path: 'certificate',
    component: ManageCertificateComponent
  },
  {
    path: 'role',
    component: ManageRoleComponent
  },
  {
    path: 'users',
    component: ManageUsersComponent
  },
  {
    path: '',
    component: StatisticsComponent
  },
  {
    path: 'charts',
    component: ChartsComponent
  },
  {
    path: 'createCourse',
    component: CreateCoursesComponent
  },
  {
    path: 'createExams',
    component: CreateExamsComponent
  },
  {
    path: 'managelogins',
    component: ManageLoginComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: 'inbox',
    component: InboxComponent
  },
  {
    path: 'adminProfile',
    component: AdminProfileComponent
  },
  {
    path: 'adminEditProfile',
    component: AdminEditprofileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

