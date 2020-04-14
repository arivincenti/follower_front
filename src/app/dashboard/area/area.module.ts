import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AreaProfileComponent } from "./area-profile/area-profile.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { MemberModule } from "../member/member.module";
import { RouterModule } from "@angular/router";
import { AreaRoutingModule } from "./area-routing.module";
import { AreaFormComponent } from "src/app/shared/forms/area-form/area-form.component";
import { PipesModule } from "src/app/pipes/pipes.module";
import { AreaMemberFormComponent } from "src/app/shared/forms/areaMemberForm/area-member-form.component";
import { AreaMembersListComponent } from './area-members-list/area-members-list.component';
import { AreaMembersListCardComponent } from './area-members-list-card/area-members-list-card.component';

@NgModule({
  declarations: [AreaProfileComponent, AreaMembersListComponent, AreaMembersListCardComponent],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MemberModule,
    AreaRoutingModule,
    PipesModule
  ],
  entryComponents: [AreaMemberFormComponent, AreaFormComponent]
})
export class AreaModule {}
