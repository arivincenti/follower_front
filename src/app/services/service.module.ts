import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "./auth/auth.service";
import { OrganizationsService } from "./organizations/organizations.service";
import { MembersService } from "./members/members.service";
import { TicketsService } from "./tickets/tickets.service";
import { NotificationsService } from "./notifications/notifications.service";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule],
  providers: [
    AuthService,
    OrganizationsService,
    MembersService,
    TicketsService,
    NotificationsService,
  ],
})
export class ServiceModule {}
