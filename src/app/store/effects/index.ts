import { UiEffects } from './ui/ui.effects';
import { AuthEffects } from './auth/auth.effects';
import { OrganizationsEffects } from './userOrganizations/organizations/organizations.effects';
import { OrganizationEffects } from './userOrganizations/selectedOrganization/organization.effects';
import { AreasEffects } from './userOrganizations/selectedOrganization/areas/areas/areas.effects';
import { MembersEffects } from './userOrganizations/selectedOrganization/members/members/members.effects';
import { MemberEffects } from './userOrganizations/selectedOrganization/members/member/member.effects';
import { MemberAreasEffects } from './userOrganizations/selectedOrganization/members/memberAreas/memberAreas.effects';
import { AreaEffects } from './userOrganizations/selectedOrganization/areas/area/area/area.effects';
import { AreaMembersEffects } from './userOrganizations/selectedOrganization/areas/area/areaMembers/areaMembers.effects';


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
  AreaMembersEffects
];

export * from './ui/ui.effects';
export * from './auth/auth.effects';
export * from './userOrganizations/organizations/organizations.effects';
export * from './userOrganizations/selectedOrganization/organization.effects';
export * from './userOrganizations/selectedOrganization/areas/areas/areas.effects';
export * from './userOrganizations/selectedOrganization/members/members/members.effects';
export * from './userOrganizations/selectedOrganization/members/member/member.effects';
export * from './userOrganizations/selectedOrganization/members/memberAreas/memberAreas.effects';
export * from './userOrganizations/selectedOrganization/areas/area/area/area.effects';
export * from './userOrganizations/selectedOrganization/areas/area/areaMembers/areaMembers.effects';