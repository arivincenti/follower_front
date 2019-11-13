import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { OrganizationModalComponent } from './modals/organization-modal/organization-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AreaModalComponent } from './modals/area-modal/area-modal.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LoadingComponent,
    OrganizationModalComponent,
    AreaModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LoadingComponent,
    OrganizationModalComponent,
    AreaModalComponent
  ]
})
export class SharedModule { }
