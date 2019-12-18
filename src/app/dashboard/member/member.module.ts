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
import { MemberAreasListComponent } from './memberAreas/member-areas-list/member-areas-list.component';
import { MemberAreasListCardComponent } from './memberAreas/member-areas-list-card/member-areas-list-card.component';
import { AreasPaginatorPipe } from 'src/app/pipes/areas/areas-paginator.pipe';

@NgModule({
  declarations: [
    MemberFormComponent,
    MemberProfileComponent,
    MemberListComponent,
    MemberListCardComponent,
    MemberPaginatorPipe,
    MemberAreasListComponent,
    MemberAreasListCardComponent,

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
    MemberListCardComponent,
    MemberAreasListComponent,
    MemberAreasListCardComponent
  ]
})
export class MemberModule { }
