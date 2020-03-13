import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TicketListComponent } from "../organization/ticket-list/ticket-list.component";
import { TicketListCardComponent } from "../organization/ticket-list-card/ticket-list-card.component";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { TicketComponent } from "./ticket/ticket.component";
import { TicketFormComponent } from "../organization/ticket-form/ticket-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommentModule } from "../comment/comment.module";
import { TicketRoutingModule } from "./ticket-routing.module";

@NgModule({
  declarations: [
    // TicketListComponent,
    // TicketListCardComponent,
    // TicketFormComponent
    TicketComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    TicketRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CommentModule
  ],
  exports: []
})
export class TicketModule {}
