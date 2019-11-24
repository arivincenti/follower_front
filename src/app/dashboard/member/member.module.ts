import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MemberFormComponent, MemberProfileComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class MemberModule { }
