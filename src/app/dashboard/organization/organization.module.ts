import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrganizationComponent } from "./organization/organization.component";
import { OrganizationListCardComponent } from "./organization-list-card/organization-list-card.component";
import { OrganizationListComponent } from "./organization-list/organization-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { OrganizationFormComponent } from "../../shared/organization-form/organization-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { OrganizationRoutingModule } from "./organization-routing.module";
import { TicketListComponent } from "./ticket-list/ticket-list.component";
import { TicketListCardComponent } from "./ticket-list-card/ticket-list-card.component";
import { TicketFormComponent } from "./ticket-form/ticket-form.component";

@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationListComponent,
    OrganizationListCardComponent,
    TicketListComponent,
    TicketListCardComponent,
    TicketFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    OrganizationRoutingModule,
    AngularMaterialModule
  ],
  entryComponents: [TicketFormComponent, OrganizationFormComponent]
})
export class OrganizationModule {}
