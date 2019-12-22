import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MemberListComponent } from './member-list/member-list.component';

import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { MemberListCardComponent } from './member-list-card/member-list-card.component';
import { MemberPaginatorPipe } from 'src/app/pipes/members/member-paginator.pipe';

@NgModule({
  declarations: [
    MemberFormComponent,
    MemberProfileComponent,
    MemberListComponent,
    MemberListCardComponent,
    MemberPaginatorPipe

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule
  ],
  exports: [
    MemberListComponent,
    MemberListCardComponent
  ]
})
export class MemberModule { }
