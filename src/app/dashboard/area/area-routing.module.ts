import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginGuard } from "src/app/guards/login/login.guard";
import { VerifyTokenGuard } from "src/app/guards/token/verify-token.guard";
import { AreaProfileComponent } from "../area/area-profile/area-profile.component";
import { areaRoutes } from "./area.routes";

const routes: Routes = [
  {
    path: "",
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: AreaProfileComponent
    // children: areaRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaRoutingModule {}
