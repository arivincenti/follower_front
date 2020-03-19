import { Routes } from "@angular/router";
import { LoginGuard } from "src/app/guards/login/login.guard";
import { VerifyTokenGuard } from "src/app/guards/token/verify-token.guard";
import { AreaFormComponent } from "../../area/area-form/area-form.component";
import { AreaProfileComponent } from "../../area/area-profile/area-profile.component";
import { MemberFormComponent } from "../../member/member-form/member-form.component";
import { MemberProfileComponent } from "../../member/member-profile/member-profile.component";
import { PruebaComponent } from "./prueba/prueba.component";
import { MemberListComponent } from "../../member/member-list/member-list.component";

export const organizationProfileRoutes: Routes = [
  {
    path: "",
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: MemberListComponent
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
  },
  {
    path: "prueba",
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: PruebaComponent
  }
];
