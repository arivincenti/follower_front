import { Routes } from "@angular/router";
import { LoginGuard } from "src/app/guards/login/login.guard";
import { VerifyTokenGuard } from "src/app/guards/token/verify-token.guard";
import { AreaFormComponent } from "../../../shared/area-form/area-form.component";
import { MemberFormComponent } from "../../../shared/member-form/member-form.component";
import { MemberListComponent } from "../../member/member-list/member-list.component";
import { AreasListComponent } from "./areas-list/areas-list.component";

export const organizationProfileRoutes: Routes = [
  {
    path: "",
    redirectTo: "members",
    pathMatch: "full"
  },
  {
    path: "members",
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: MemberListComponent
  },
  {
    path: "areas",
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: AreasListComponent
  },
  {
    path: "areas/form",
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: AreaFormComponent
  },
  {
    path: "members/form",
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: MemberFormComponent
  }
];
