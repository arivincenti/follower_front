import { Routes } from '@angular/router';
import { OrganizationListComponent } from './organization/organization-list/organization-list.component';
import { OrganizationComponent } from './organization/organization/organization.component';


export const dashboardRoutes: Routes = [
  { path: '', redirectTo: 'organizations', pathMatch: 'full' },
  { path: 'organizations', component: OrganizationListComponent },
  { path: 'organizations/:id', component: OrganizationComponent }
];