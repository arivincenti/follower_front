import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { OrganizationListComponent } from './organization/organization-list/organization-list.component';
import { AreaListComponent } from './area/area-list/area-list.component';
import { OrganizationCardComponent } from './organization/organization-card/organization-card.component';
import { OrganizationComponent } from './organization/organization/organization.component';

@NgModule({
  declarations: [
    DashboardComponent,
    OrganizationListComponent,
    AreaListComponent,
    OrganizationCardComponent,
    OrganizationComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
