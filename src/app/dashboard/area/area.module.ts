import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AreaProfileComponent } from "./area-profile/area-profile.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { MemberModule } from "../member/member.module";
import { RouterModule } from "@angular/router";
import { AreaRoutingModule } from "./area-routing.module";
import { MemberFormComponent } from "src/app/shared/member-form/member-form.component";
import { AreaFormComponent } from "src/app/shared/area-form/area-form.component";

@NgModule({
  declarations: [AreaProfileComponent],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MemberModule,
    AreaRoutingModule
  ],
  entryComponents: [MemberFormComponent, AreaFormComponent]
})
export class AreaModule {}
