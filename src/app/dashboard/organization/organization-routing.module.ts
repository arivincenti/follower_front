import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginGuard } from "src/app/guards/login/login.guard";
import { OrganizationComponent } from "./organization/organization.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {}
