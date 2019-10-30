import { Routes } from '@angular/router';
import { OrganizationListComponent } from './organization/organization-list/organization-list.component';
import { AreaListComponent } from './area/area-list/area-list.component';


export const dashboardRoutes: Routes = [
  { path: '', redirectTo: 'organizations', pathMatch: 'full' },
  { path: 'organizations', component: OrganizationListComponent },
  { path: 'areas', component: AreaListComponent }
];