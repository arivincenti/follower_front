import { UiEffects } from './ui/ui.effects';
import { AuthEffects } from './auth/auth.effects';
import { OrganizationsEffects } from './userOrganizations/organizations/organizations.effects';
import { OrganizationEffects } from './userOrganizations/selectedOrganization/organization.effects';
import { AreasEffects } from './userOrganizations/selectedOrganization/areas/areas/areas.effects';
import { MembersEffects } from './userOrganizations/selectedOrganization/members/members/members.effects';
import { MemberEffects } from './userOrganizations/selectedOrganization/members/member/member.effects';
import { MemberAreasEffects } from './userOrganizations/selectedOrganization/members/memberAreas/memberAreas.effects';
import { AreaEffects } from './userOrganizations/selectedOrganization/areas/area/area.effects';
import { UserTicketsEffects } from './userOrganizations/tickets/userTickets/userTickets.effects';
import { AreaTicketsEffects } from './userOrganizations/tickets/areaTickets/areaTickets.effects';
import { TicketEffects } from './userOrganizations/tickets/ticket/ticket.effects';

export const effects: any[] = [
	UiEffects,
	AuthEffects,
	OrganizationsEffects,
	OrganizationEffects,
	MembersEffects,
	MemberEffects,
	MemberAreasEffects,
	AreasEffects,
	AreaEffects,
	UserTicketsEffects,
	AreaTicketsEffects,
	TicketEffects
];

export * from './ui/ui.effects';
export * from './auth/auth.effects';
export * from './userOrganizations/organizations/organizations.effects';
export * from './userOrganizations/selectedOrganization/organization.effects';
export * from './userOrganizations/selectedOrganization/areas/areas/areas.effects';
export * from './userOrganizations/selectedOrganization/members/members/members.effects';
export * from './userOrganizations/selectedOrganization/members/member/member.effects';
export * from './userOrganizations/selectedOrganization/members/memberAreas/memberAreas.effects';
export * from './userOrganizations/selectedOrganization/areas/area/area.effects';
export * from './userOrganizations/tickets/userTickets/userTickets.effects';
export * from './userOrganizations/tickets/areaTickets/areaTickets.effects';
export * from './userOrganizations/tickets/ticket/ticket.effects';
