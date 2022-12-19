import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SidebarUserComponent } from './sidebar-user/sidebar-user.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { MyCertifiecateComponent } from './my-certifiecate/my-certifiecate.component';
import { MyInvoiceComponent } from './my-invoice/my-invoice.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserEditprofileComponent } from './user-editprofile/user-editprofile.component';
import { FeedbackComponent } from './feedback/feedback.component';



@NgModule({
  declarations: [
  
    SidebarUserComponent,
        MyBookingComponent,
        MyCertifiecateComponent,
        MyInvoiceComponent,
        UserProfileComponent,
        UserEditprofileComponent,
        FeedbackComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  exports : [
  ]
})
export class UserModule { }
