import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ManageExamsComponent } from './manage-exams/manage-exams.component';


@NgModule({
  declarations: [
    ManageCoursesComponent,
    SidebarComponent,
    ManageExamsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
