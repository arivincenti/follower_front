import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrganizationProfileComponent } from "./organization-profile/organization-profile.component";
import { MemberModule } from "../member/member.module";
import { OrganizationRoutingModule } from "./organization-routing.module";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AreasListComponent } from "../areas/areas-list/areas-list.component";
import { AreasListCardComponent } from "../areas/areas-list-card/areas-list-card.component";
import { PipesModule } from "src/app/pipes/pipes.module";

@NgModule({
  declarations: [
    OrganizationProfileComponent,
    AreasListComponent,
    AreasListCardComponent,
  ],
  imports: [
    CommonModule,
    MemberModule,
    OrganizationRoutingModule,
    AngularMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
  ],
})
export class OrganizationProfileModule {}
