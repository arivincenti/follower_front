import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MemberListComponent } from './member-list/member-list.component';

@NgModule({
  declarations: [
    MemberFormComponent,
    MemberProfileComponent,
    MemberListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class MemberModule { }
