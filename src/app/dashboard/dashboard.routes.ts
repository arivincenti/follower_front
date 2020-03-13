import { Routes } from "@angular/router";

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
      )
  },
  {
    path: "ticket/:id",
    loadChildren: () =>
      import("./ticket/ticket.module").then(m => m.TicketModule)
  },
  {
    path: "notifications",
    loadChildren: () =>
      import("./notifications/notifications.module").then(
        m => m.NotificationsModule
      )
  }
];
