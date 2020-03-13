import { Routes } from "@angular/router";
import { LoginGuard } from "src/app/guards/login/login.guard";
import { VerifyTokenGuard } from "src/app/guards/token/verify-token.guard";
import { AreaFormComponent } from "../../area/area-form/area-form.component";
import { AreaProfileComponent } from "../../area/area-profile/area-profile.component";
import { MemberFormComponent } from "../../member/member-form/member-form.component";
import { MemberProfileComponent } from "../../member/member-profile/member-profile.component";
import { OrganizationProfileComponent } from "./organization-profile/organization-profile.component";

export const organizationProfileRoutes: Routes = [
  {
    path: ":id",
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: OrganizationProfileComponent
  },
  {
    path: "areas/form",
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: AreaFormComponent
  },
  {
    path: "area/:id",
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: AreaProfileComponent
  },
  {
    path: "members/form",
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: MemberFormComponent
  },
  {
    path: "organizations/members/profile/:id",
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: MemberProfileComponent
  }
];
