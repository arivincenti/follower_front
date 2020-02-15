import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TicketListComponent } from "./ticket-list/ticket-list.component";
import { TicketListCardComponent } from "./ticket-list-card/ticket-list-card.component";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { TicketComponent } from "./ticket/ticket.component";
import { TicketFormComponent } from "./ticket-form/ticket-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommentModule } from "../comment/comment.module";

@NgModule({
  declarations: [
    TicketListComponent,
    TicketListCardComponent,
    TicketComponent,
    TicketFormComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    CommentModule
  ],
  exports: [TicketListComponent, TicketListCardComponent, TicketFormComponent]
})
export class TicketModule {}
