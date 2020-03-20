import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard.component";
import { SharedModule } from "../shared/shared.module";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { LoginGuard } from "../guards/login/login.guard";
import { SnackbarComponent } from "../shared/snackbar/snackbar.component";

@NgModule({
  declarations: [DashboardComponent, MainNavComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule
  ],
  providers: [LoginGuard],
  entryComponents: [SnackbarComponent]
})
export class DashboardModule {}
