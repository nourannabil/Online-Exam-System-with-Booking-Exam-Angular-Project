import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { MyCertifiecateComponent } from './my-certifiecate/my-certifiecate.component';
import { MyInvoiceComponent } from './my-invoice/my-invoice.component';
import { SidebarUserComponent } from './sidebar-user/sidebar-user.component';
import { UserEditprofileComponent } from './user-editprofile/user-editprofile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  {
    path: 'sidebarUser',
    component: SidebarUserComponent
  },
  {
    path: 'myBooking',
    component: MyBookingComponent
  },
  {
    path: 'myCertificate',
    component: MyCertifiecateComponent
  },
  {
    path: 'userProfile',
    component: UserProfileComponent
  },
  {
    path: 'userEditProfile',
    component: UserEditprofileComponent
  },
  {
    path: 'myInvoice',
    component: MyInvoiceComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
