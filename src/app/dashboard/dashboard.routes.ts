import { Routes } from '@angular/router';
import { OrganizationComponent } from './organization/organization/organization.component';
import { OrganizationFormComponent } from './organization/organization-form/organization-form.component';
import { OrganizationProfileComponent } from './organization/organization-profile/organization-profile.component';
import { AreaProfileComponent } from './area/area-profile/area-profile.component';
import { AreaFormComponent } from './area/area-form/area-form.component';
import { MemberFormComponent } from './member/member-form/member-form.component';
import { MemberProfileComponent } from './member/member-profile/member-profile.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { VerifyTokenGuard } from '../guards/token/verify-token.guard';
import { LoginGuard } from '../guards/login/login.guard';
import { TicketComponent } from './ticket/ticket/ticket.component';
import { TicketFormComponent } from './ticket/ticket-form/ticket-form.component';


export const dashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: 'organizations',
    pathMatch: 'full'
  },
  {
    path: 'organizations',
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: OrganizationComponent
  },
  {
    path: 'organizations/form',
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: OrganizationFormComponent
  },
  {
    path: 'organizations/profile/:id',
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: OrganizationProfileComponent
  },
  {
    path: 'areas/form',
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: AreaFormComponent
  },
  {
    path: 'organizations/areas/profile/:id',
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: AreaProfileComponent
  },
  {
    path: 'members/form',
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: MemberFormComponent
  },
  {
    path: 'organizations/members/profile/:id',
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: MemberProfileComponent
  },
  {
    path: 'user/profile',
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: UserProfileComponent
  },
  {
    path: 'ticket/:id',
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: TicketComponent
  },
  {
    path: 'ticket/form',
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: TicketFormComponent
  },
];