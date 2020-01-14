import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { WebComponent } from './web/web.component';

const routes: Routes = [
  { path: '', redirectTo: '/web', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'web', component: WebComponent},
  { 
    path: 'app',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: '**', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
