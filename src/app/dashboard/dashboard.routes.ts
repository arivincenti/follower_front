import { Routes } from '@angular/router';
import { OrganizationComponent } from './organization/organization/organization.component';
import { OrganizationFormComponent } from './organization/organization-form/organization-form.component';
import { OrganizationProfileComponent } from './organization/organization-profile/organization-profile.component';
import { AreaProfileComponent } from './area/area-profile/area-profile.component';
import { AreaFormComponent } from './area/area-form/area-form.component';
import { MemberFormComponent } from './member/member-form/member-form.component';
import { MemberProfileComponent } from './member/member-profile/member-profile.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';


export const dashboardRoutes: Routes = [
  { path: '', redirectTo: 'organizations', pathMatch: 'full' },
  { path: 'organizations', component: OrganizationComponent },
  { path: 'organizations/form/:id', component: OrganizationFormComponent },
  { path: 'organizations/profile/:id', component: OrganizationProfileComponent },
  { path: 'organizations/areas/form/:id', component: AreaFormComponent },
  { path: 'organizations/areas/profile/:id', component: AreaProfileComponent },
  { path: 'organizations/members/form/:id', component: MemberFormComponent },
  { path: 'organizations/members/profile/:id', component: MemberProfileComponent },
  { path: 'user/profile', component: UserProfileComponent },
];