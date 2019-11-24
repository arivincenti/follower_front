import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationModule } from './organization/organization.module';
import { AreaModule } from './area/area.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberModule } from './member/member.module';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './user/user/user.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    OrganizationModule,
    AreaModule,
    MemberModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DashboardModule { }
