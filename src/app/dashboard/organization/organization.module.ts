import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationListCardComponent } from './organization-list-card/organization-list-card.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { AreaModule } from '../area/area.module';
import { MemberModule } from '../member/member.module';
import { UserProfileComponent } from '../user/user-profile/user-profile.component';
import { TicketListComponent } from '../ticket/ticket-list/ticket-list.component';
import { TicketListCardComponent } from '../ticket/ticket-list-card/ticket-list-card.component';
import { TicketModule } from '../ticket/ticket.module';

@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationListComponent,
    OrganizationListCardComponent,
    OrganizationProfileComponent,
    OrganizationFormComponent,
    UserProfileComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    AreaModule,
    MemberModule,
    TicketModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class OrganizationModule { }
