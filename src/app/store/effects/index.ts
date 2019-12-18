import { UiEffects } from './ui/ui.effects';
import { AuthEffects } from './auth/auth.effects';
import { OrganizationsEffects } from './userOrganizations/organizations/organizations.effects';
import { OrganizationEffects } from './userOrganizations/selectedOrganization/organization.effects';
import { OrganizationAreasEffects } from './userOrganizations/selectedOrganization/areas/Areas.effects';
import { OrganizationUserAreasEffects } from './userOrganizations/selectedOrganization/UserAreas.effects';
import { MembersEffects } from './userOrganizations/selectedOrganization/members/members/members.effects';
import { MemberEffects } from './userOrganizations/selectedOrganization/members/member/member.effects';
import { MemberAreasEffects } from './userOrganizations/selectedOrganization/members/memberAreas/memberAreas.effects';


export const effects: any[] = [
  UiEffects,
  AuthEffects,
  OrganizationsEffects,
  OrganizationEffects,
  OrganizationAreasEffects,
  OrganizationUserAreasEffects,
  MembersEffects,
  MemberEffects,
  MemberAreasEffects
];

export * from './ui/ui.effects';
export * from './auth/auth.effects';
export * from './userOrganizations/organizations/organizations.effects';
export * from './userOrganizations/selectedOrganization/organization.effects';
export * from './userOrganizations/selectedOrganization/areas/Areas.effects';
export * from './userOrganizations/selectedOrganization/UserAreas.effects';
export * from './userOrganizations/selectedOrganization/members/members/members.effects';
export * from './userOrganizations/selectedOrganization/members/member/member.effects';
export * from './userOrganizations/selectedOrganization/members/memberAreas/memberAreas.effects';