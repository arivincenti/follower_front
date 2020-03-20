import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrganizationProfileComponent } from "./organization-profile/organization-profile.component";
import { MemberModule } from "../../member/member.module";
import { OrganizationProfileRoutingModule } from "./organization-profile-routing.module";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AreasListComponent } from "./areas-list/areas-list.component";
import { AreasListCardComponent } from "./areas-list-card/areas-list-card.component";

@NgModule({
  declarations: [
    OrganizationProfileComponent,
    AreasListComponent,
    AreasListCardComponent
  ],
  imports: [
    CommonModule,
    MemberModule,
    OrganizationProfileRoutingModule,
    AngularMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class OrganizationProfileModule {}
