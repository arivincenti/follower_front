import { Routes } from "@angular/router";
import { LoginGuard } from "src/app/guards/login/login.guard";
import { VerifyTokenGuard } from "src/app/guards/token/verify-token.guard";
import { MemberListComponent } from "../member/member-list/member-list.component";

export const areaRoutes: Routes = [
  {
    path: "",
    redirectTo: "members",
    pathMatch: "full"
  },
  {
    path: "members",
    canActivate: [LoginGuard, VerifyTokenGuard],
    component: MemberListComponent
  }
];
