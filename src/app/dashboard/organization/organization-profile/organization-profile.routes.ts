import { Routes } from "@angular/router";
import { LoginGuard } from "src/app/guards/login/login.guard";
import { VerifyTokenGuard } from "src/app/guards/token/verify-token.guard";
import { AreaFormComponent } from "../../../shared/forms/area-form/area-form.component";
import { MemberFormComponent } from "../../../shared/forms/member-form/member-form.component";

export const organizationProfileRoutes: Routes = [
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
