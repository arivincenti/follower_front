import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginGuard } from "src/app/guards/login/login.guard";
import { VerifyTokenGuard } from "src/app/guards/token/verify-token.guard";
import { organizationProfileRoutes } from "./organization-profile.routes";
import { OrganizationProfileComponent } from "./organization-profile/organization-profile.component";

const routes: Routes = [
  {
    path: "",
    component: OrganizationProfileComponent,
    canActivate: [LoginGuard, VerifyTokenGuard],
    children: organizationProfileRoutes
  },
  {
    path: "area/:id",
    loadChildren: () =>
      import("../../area/area.module").then(m => m.AreaModule),
    canLoad: [VerifyTokenGuard],
    canActivate: [LoginGuard, VerifyTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationProfileRoutingModule {}
