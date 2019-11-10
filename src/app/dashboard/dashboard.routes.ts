import { Routes } from '@angular/router';
import { OrganizationListComponent } from './organization/organization-list/organization-list.component';
import { OrganizationComponent } from './organization/organization/organization.component';
import { OrganizationProfileComponent } from './organization/organization-profile/organization-profile.component';


export const dashboardRoutes: Routes = [
  { path: '', redirectTo: 'organizations', pathMatch: 'full' },
  { path: 'organizations', component: OrganizationComponent },
  { path: 'organizations/profile/:id', component: OrganizationProfileComponent },
];