import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotificationsComponent } from "./notifications/notifications.component";
import { LoginGuard } from "src/app/guards/login/login.guard";

const routes: Routes = [
  {
    path: "",
    canActivate: [LoginGuard],
    component: NotificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {}
