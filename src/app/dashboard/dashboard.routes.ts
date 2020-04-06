import { Routes } from "@angular/router";
import { VerifyTokenGuard } from "../guards/token/verify-token.guard";

export const dashboardRoutes: Routes = [
  {
    path: "",
    redirectTo: "organizations",
    pathMatch: "full"
  },
  {
    path: "organizations",
    loadChildren: () =>
      import("./organization/organization.module").then(
        m => m.OrganizationModule
      ),
    canLoad: [VerifyTokenGuard],
    canActivate: [VerifyTokenGuard]
  },
  {
    path: "notifications",
    loadChildren: () =>
      import("./notifications/notifications.module").then(
        m => m.NotificationsModule
      ),
    canLoad: [VerifyTokenGuard],
    canActivate: [VerifyTokenGuard]
  }
];
