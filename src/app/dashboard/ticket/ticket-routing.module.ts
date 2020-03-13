import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginGuard } from "src/app/guards/login/login.guard";
import { TicketComponent } from "./ticket/ticket.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [LoginGuard],
    component: TicketComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule {}
