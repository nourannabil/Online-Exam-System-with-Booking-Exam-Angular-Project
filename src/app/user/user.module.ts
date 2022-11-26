import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SidebarUserComponent } from './sidebar-user/sidebar-user.component';



@NgModule({
  declarations: [
  
    SidebarUserComponent
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
