import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AreaProfileComponent } from './area-profile/area-profile.component';
import { AreaMembersListComponent } from './area-members-list/area-members-list.component';
import { AreaMembersListItemComponent } from './area-members-list-item/area-members-list-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AreaFormComponent } from './area-form/area-form.component';

@NgModule({
  declarations: [
    AreaProfileComponent,
    AreaMembersListComponent,
    AreaMembersListItemComponent,
    AreaFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class AreaModule { }
