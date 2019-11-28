import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AreaModalComponent } from './modals/area-modal/area-modal.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LoadingComponent,
    AreaModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LoadingComponent,
    AreaModalComponent
  ]
})
export class SharedModule { }
