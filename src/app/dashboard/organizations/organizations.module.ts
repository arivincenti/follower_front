import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserProfileComponent } from "../user/user-profile/user-profile.component";
import { OrganizationsComponent } from "./organizations/organizations.component";
import { OrganizationsListComponent } from "./organizations-list/organizations-list.component";
import { OrganizationsListCardComponent } from "./organizations-list-card/organizations-list-card.component";
import { TicketListComponent } from "../tickets/ticket-list/ticket-list.component";
import { TicketListCardComponent } from "../tickets/ticket-list-card/ticket-list-card.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrganizationsRoutingModule } from "../organizations/organizations-routing.module";
import { PipesModule } from "src/app/pipes/pipes.module";
import { TicketFormComponent } from "src/app/shared/forms/ticket-form/ticket-form.component";
import { OrganizationFormComponent } from "src/app/shared/forms/organization-form/organization-form.component";

@NgModule({
  declarations: [
    UserProfileComponent,
    OrganizationsComponent,
    OrganizationsListComponent,
    OrganizationsListCardComponent,
    TicketListComponent,
    TicketListCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OrganizationsRoutingModule,
    PipesModule,
  ],
  entryComponents: [TicketFormComponent, OrganizationFormComponent],
})
export class OrganizationsModule {}
