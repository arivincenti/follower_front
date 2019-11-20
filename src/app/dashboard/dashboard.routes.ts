import { Routes } from '@angular/router';
import { OrganizationComponent } from './organization/organization/organization.component';
import { OrganizationFormComponent } from './organization/organization-form/organization-form.component';
import { OrganizationProfileComponent } from './organization/organization-profile/organization-profile.component';
import { AreaProfileComponent } from './area/area-profile/area-profile.component';


export const dashboardRoutes: Routes = [
  { path: '', redirectTo: 'organizations', pathMatch: 'full' },
  { path: 'organizations', component: OrganizationComponent },
  { path: 'organizations/form/:id', component: OrganizationFormComponent },
  { path: 'organizations/profile/:id', component: OrganizationProfileComponent },
  { path: 'organizations/areas/profile/:id', component: AreaProfileComponent },
];