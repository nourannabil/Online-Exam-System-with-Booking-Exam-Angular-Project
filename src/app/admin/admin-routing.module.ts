import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageContactUsComponent } from './manage-contact-us/manage-contact-us.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { ManageExamsComponent } from './manage-exams/manage-exams.component';
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
    path: 'contactinfo',
    component: ManageContactUsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
