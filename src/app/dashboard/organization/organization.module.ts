import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationListCardComponent } from './organization-list-card/organization-list-card.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationUserAreasListComponent } from './organization-user-areas-list/organization-user-areas-list.component';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { AreaModule } from '../area/area.module';
import { MemberModule } from '../member/member.module';

@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationListComponent,
    OrganizationListCardComponent,
    OrganizationUserAreasListComponent,
    OrganizationProfileComponent,
    OrganizationFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AreaModule,
    MemberModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class OrganizationModule { }
