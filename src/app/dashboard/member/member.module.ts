import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MemberListComponent } from './member-list/member-list.component';

import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { MemberListCardComponent } from './member-list-card/member-list-card.component';

@NgModule({
  declarations: [
    MemberFormComponent,
    MemberProfileComponent,
    MemberListComponent,
    MemberListCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AngularMaterialModule
  ],
  exports: [
    MemberListComponent,
    MemberListCardComponent
  ]
})
export class MemberModule { }
