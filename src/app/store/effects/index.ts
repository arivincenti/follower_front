import { AuthEffects } from "./auth/auth.effects";
import { OrganizationsEffects } from "./userOrganizations/organizations/organizations.effects";
// import { OrganizationEffects } from "./userOrganizations/selectedOrganization/organization.effects";
import { AreasEffects } from "./userOrganizations/selectedOrganization/areas/areas.effects";
import { MembersEffects } from "./userOrganizations/selectedOrganization/members/members.effects";
import { UserTicketsEffects } from "./userOrganizations/tickets/userTickets/userTickets.effects";
import { AreaTicketsEffects } from "./userOrganizations/tickets/areaTickets/areaTickets.effects";
import { TicketEffects } from "./userOrganizations/tickets/ticket/ticket/ticket.effects";
import { CommentsEffects } from "./userOrganizations/tickets/ticket/comments/comments.effects";
import { NotificationsEffects } from "./userOrganizations/notifications/notifications.effects";

export const effects: any[] = [
  AuthEffects,
  OrganizationsEffects,
  MembersEffects,
  AreasEffects,
  UserTicketsEffects,
  AreaTicketsEffects,
  TicketEffects,
  CommentsEffects,
  NotificationsEffects,
];

export * from "./auth/auth.effects";
export * from "./userOrganizations/organizations/organizations.effects";
export * from "./userOrganizations/selectedOrganization/areas/areas.effects";
export * from "./userOrganizations/selectedOrganization/members/members.effects";
export * from "./userOrganizations/tickets/userTickets/userTickets.effects";
export * from "./userOrganizations/tickets/areaTickets/areaTickets.effects";
export * from "./userOrganizations/tickets/ticket/ticket/ticket.effects";
export * from "./userOrganizations/tickets/ticket/comments/comments.effects";
export * from "./userOrganizations/notifications/notifications.effects";
