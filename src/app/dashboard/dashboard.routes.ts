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
    path: 'organizations/form/:id',
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: OrganizationFormComponent
  },
  {
    path: 'organizations/profile/:id',
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: OrganizationProfileComponent
  },
  {
    path: 'organizations/areas/form/:id',
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: AreaFormComponent
  },
  {
    path: 'organizations/areas/profile/:id',
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: AreaProfileComponent
  },
  {
    path: 'organizations/members/form/:id',
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
];