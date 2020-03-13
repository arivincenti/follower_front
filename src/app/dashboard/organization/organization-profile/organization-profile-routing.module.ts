import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginGuard } from "src/app/guards/login/login.guard";
import { VerifyTokenGuard } from "src/app/guards/token/verify-token.guard";
import { OrganizationProfileComponent } from "./organization-profile/organization-profile.component";
import { organizationProfileRoutes } from "./organization-profile.routes";

const routes: Routes = [
  {
    path: "",
    canActivate: [LoginGuard, VerifyTokenGuard],
    children: organizationProfileRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationProfileRoutingModule {}
