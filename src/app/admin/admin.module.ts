import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ManageExamsComponent } from './manage-exams/manage-exams.component';
import { ManageContactUsComponent } from './manage-contact-us/manage-contact-us.component';


@NgModule({
  declarations: [
    ManageCoursesComponent,
    SidebarComponent,
    ManageExamsComponent,
    ManageContactUsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
