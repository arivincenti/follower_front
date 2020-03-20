import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginGuard } from "src/app/guards/login/login.guard";
import { OrganizationComponent } from "./organization/organization.component";
import { VerifyTokenGuard } from "src/app/guards/token/verify-token.guard";

const routes: Routes = [
  {
    path: "",
    canActivate: [LoginGuard],
    component: OrganizationComponent
  },
  {
    path: "profile/:id",
    loadChildren: () =>
      import("./organization-profile/organization-profile.module").then(
        m => m.OrganizationProfileModule
      )
  },
  {
    path: "area/:id",
    canActivate: [LoginGuard, VerifyTokenGuard],
    loadChildren: () => import("../area/area.module").then(m => m.AreaModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {}
