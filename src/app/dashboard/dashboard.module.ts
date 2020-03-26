import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard.component";
import { SharedModule } from "../shared/shared.module";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { LoginGuard } from "../guards/login/login.guard";
import { PipesModule } from "../pipes/pipes.module";
import { UpdatedNotificationComponent } from "../shared/snackbar/updated-notification/updated-notification.component";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule,
    PipesModule
  ],
  providers: [LoginGuard],
  entryComponents: [UpdatedNotificationComponent]
})
export class DashboardModule {}
