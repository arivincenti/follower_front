import { AuthEffects } from "./auth/auth.effects";
import { OrganizationsEffects } from "./userOrganizations/organizations/organizations.effects";
import { OrganizationEffects } from "./userOrganizations/organization/organization/organization.effects";
import { AreasEffects } from "./userOrganizations/organization/areas/areas.effects";
import { MemberEffects } from "./userOrganizations/organization/member/member.effects";
import { MembersEffects } from "./userOrganizations/organization/members/members.effects";
import { CommentsEffects } from "./userOrganizations/tickets/comments/comments.effects";
import { NotificationsEffects } from "./userOrganizations/notifications/notifications.effects";
import { TicketsEffects } from "./userOrganizations/tickets/tickets/tickets.effects";
import { AreaEffects } from "./userOrganizations/organization/area/area.effects";

export const effects: any[] = [
  AuthEffects,
  OrganizationEffects,
  OrganizationsEffects,
  MemberEffects,
  MembersEffects,
  AreasEffects,
  AreaEffects,
  TicketsEffects,
  CommentsEffects,
  NotificationsEffects,
];

export * from "./auth/auth.effects";
export * from "./userOrganizations/organizations/organizations.effects";
export * from "./userOrganizations/organization/organization/organization.effects";
export * from "./userOrganizations/organization/areas/areas.effects";
export * from "./userOrganizations/organization/area/area.effects";
export * from "./userOrganizations/organization/member/member.effects";
export * from "./userOrganizations/organization/members/members.effects";
export * from "./userOrganizations/tickets/tickets/tickets.effects";
export * from "./userOrganizations/tickets/comments/comments.effects";
export * from "./userOrganizations/notifications/notifications.effects";
