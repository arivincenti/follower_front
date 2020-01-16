import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { OrganizationsService } from './organizations/organizations.service';
import { MembersService } from './members/members.service';
import { TicketsService } from './tickets/tickets.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    AuthService,
    OrganizationsService,
    MembersService,
    TicketsService
  ]
})
export class ServiceModule { }
