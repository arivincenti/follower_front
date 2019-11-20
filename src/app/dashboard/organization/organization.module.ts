import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationCardComponent } from './organization-card/organization-card.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationAreasListComponent } from './organization-areas-list/organization-areas-list.component';
import { OrganizationUserAreasListComponent } from './organization-user-areas-list/organization-user-areas-list.component';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';
import { OrganizationAreasListItemsComponent } from './organization-areas-list-items/organization-areas-list-items.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationCardComponent,
    OrganizationListComponent,
    OrganizationAreasListComponent,
    OrganizationUserAreasListComponent,
    OrganizationProfileComponent,
    OrganizationAreasListItemsComponent,
    OrganizationFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class OrganizationModule { }
