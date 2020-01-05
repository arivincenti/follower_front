import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { LoginGuard } from '../guards/login/login.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    component: DashboardComponent, children: dashboardRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
