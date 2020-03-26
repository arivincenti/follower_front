import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { TicketComponent } from "./ticket/ticket.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommentModule } from "./comment/comment.module";
import { TicketRoutingModule } from "./ticket-routing.module";
import { PipesModule } from "src/app/pipes/pipes.module";

@NgModule({
  declarations: [TicketComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    TicketRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CommentModule,
    PipesModule
  ],
  exports: []
})
export class TicketModule {}
