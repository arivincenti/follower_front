import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrganizationComponent } from "./organization/organization.component";
import { OrganizationListCardComponent } from "./organization-list-card/organization-list-card.component";
import { OrganizationListComponent } from "./organization-list/organization-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { OrganizationFormComponent } from "../../shared/organization-form/organization-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrganizationRoutingModule } from "./organization-routing.module";
import { TicketListComponent } from "./ticket-list/ticket-list.component";
import { TicketListCardComponent } from "./ticket-list-card/ticket-list-card.component";
import { TicketFormComponent } from "../../shared/ticket-form/ticket-form.component";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";

@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationListComponent,
    OrganizationListCardComponent,
    TicketListComponent,
    TicketListCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OrganizationRoutingModule
  ],
  entryComponents: [TicketFormComponent, OrganizationFormComponent]
})
export class OrganizationModule {}
