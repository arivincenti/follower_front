import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AreaProfileComponent } from './area-profile/area-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AreaFormComponent } from './area-form/area-form.component';
import { AreasListComponent } from './areas-list/areas-list.component';
import { AreasListCardComponent } from './areas-list-card/areas-list-card.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { MemberModule } from '../member/member.module';

@NgModule({
  declarations: [
    AreaProfileComponent,
    AreaFormComponent,
    AreasListComponent,
    AreasListCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MemberModule
  ],
  exports: [
    AreasListComponent,
    AreasListCardComponent
  ]
})
export class AreaModule { }
