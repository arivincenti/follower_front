import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationModule } from './organization/organization.module';
import { AreaModule } from './area/area.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberModule } from './member/member.module';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MainNavComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    OrganizationModule,
    AreaModule,
    MemberModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule
  ]
})
export class DashboardModule { }
