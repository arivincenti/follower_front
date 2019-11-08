import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { OrganizationListComponent } from './organization/organization-list/organization-list.component';
import { AreaListComponent } from './area/area-list/area-list.component';
import { OrganizationCardComponent } from './organization/organization-card/organization-card.component';
import { OrganizationComponent } from './organization/organization/organization.component';
import { OrganizationAreasListComponent } from './organization/organization-areas-list/organization-areas-list.component';
import { AreaComponent } from './area/area/area.component';
import { AreaListItemComponent } from './area/area-list-item/area-list-item.component';
import { OrganizationUserAreasListComponent } from './organization/organization-user-areas-list/organization-user-areas-list.component';
import { UserComponent } from './user/user/user.component';
import { OrganizationCreateComponent } from './organization/organization-create/organization-create.component';
import { OrganizationProfileComponent } from './organization/organization-profile/organization-profile.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AreaComponent,
    AreaListComponent,
    AreaListItemComponent,
    OrganizationComponent,
    OrganizationCardComponent,
    OrganizationListComponent,
    OrganizationAreasListComponent,
    OrganizationUserAreasListComponent,
    UserComponent,
    OrganizationCreateComponent,
    OrganizationProfileComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
