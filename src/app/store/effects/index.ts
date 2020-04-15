import { AuthEffects } from "./auth/auth.effects";
import { OrganizationsEffects } from "./userOrganizations/organizations/organizations.effects";
import { AreasEffects } from "./userOrganizations/selectedOrganization/areas/areas.effects";
import { MembersEffects } from "./userOrganizations/selectedOrganization/members/members.effects";
import { CommentsEffects } from "./userOrganizations/tickets/comments/comments.effects";
import { NotificationsEffects } from "./userOrganizations/notifications/notifications.effects";
import { TicketsEffects } from "./userOrganizations/tickets/tickets/tickets.effects";

export const effects: any[] = [
  AuthEffects,
  OrganizationsEffects,
  MembersEffects,
  AreasEffects,
  TicketsEffects,
  CommentsEffects,
  NotificationsEffects,
];

export * from "./auth/auth.effects";
export * from "./userOrganizations/organizations/organizations.effects";
export * from "./userOrganizations/selectedOrganization/areas/areas.effects";
export * from "./userOrganizations/selectedOrganization/members/members.effects";
export * from "./userOrganizations/tickets/tickets/tickets.effects";
export * from "./userOrganizations/tickets/comments/comments.effects";
export * from "./userOrganizations/notifications/notifications.effects";
