import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrganizationProfileComponent } from "./organization-profile/organization-profile.component";
import { AreaModule } from "../../area/area.module";
import { MemberModule } from "../../member/member.module";
import { OrganizationProfileRoutingModule } from "./organization-profile-routing.module";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { PruebaComponent } from './prueba/prueba.component';

@NgModule({
  declarations: [OrganizationProfileComponent, PruebaComponent],
  imports: [
    CommonModule,
    AreaModule,
    MemberModule,
    OrganizationProfileRoutingModule,
    AngularMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class OrganizationProfileModule {}
