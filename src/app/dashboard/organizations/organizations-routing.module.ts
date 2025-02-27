import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginGuard } from "src/app/guards/login/login.guard";
import { OrganizationsComponent } from "./organizations/organizations.component";
import { VerifyTokenGuard } from "src/app/guards/token/verify-token.guard";

const routes: Routes = [
  {
    path: "",
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: OrganizationsComponent,
  },
  {
    path: "ticket/:id",
    loadChildren: () =>
      import("../ticket/ticket.module").then((m) => m.TicketModule),
    canLoad: [VerifyTokenGuard],
    canActivate: [VerifyTokenGuard],
  },
  {
    path: "profile/:id",
    loadChildren: () =>
      import("../organization/organization.module").then(
        (m) => m.OrganizationProfileModule
      ),
    canLoad: [VerifyTokenGuard],
    canActivate: [LoginGuard, VerifyTokenGuard],
  },
  {
    path: "area/:id",
    canLoad: [VerifyTokenGuard],
    canActivate: [LoginGuard, VerifyTokenGuard],
    loadChildren: () => import("../area/area.module").then((m) => m.AreaModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsRoutingModule {}
