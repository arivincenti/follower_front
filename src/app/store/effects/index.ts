import { UiEffects } from './ui/ui.effects';
import { AuthEffects } from './auth/auth.effects';
import { AreasEffects } from './areas/areas.effects';
import { OrganizationsEffects } from './userOrganizations/organizations/organizations.effects';
import { OrganizationEffects } from './userOrganizations/selectedOrganization/organization.effects';
import { OrganizationAreasEffects } from './userOrganizations/selectedOrganization/Areas.effects';
import { OrganizationUserAreasEffects } from './userOrganizations/selectedOrganization/UserAreas.effects';
import { MembersEffects } from './userOrganizations/selectedOrganization/members/members.effects';


export const effects: any[] = [
  UiEffects,
  AuthEffects,
  AreasEffects,
  OrganizationsEffects,
  OrganizationEffects,
  OrganizationAreasEffects,
  OrganizationUserAreasEffects,
  MembersEffects
];

export * from './ui/ui.effects';
export * from './auth/auth.effects';
export * from './areas/areas.effects';
export * from './userOrganizations/organizations/organizations.effects';
export * from './userOrganizations/selectedOrganization/organization.effects';
export * from './userOrganizations/selectedOrganization/Areas.effects';
export * from './userOrganizations/selectedOrganization/UserAreas.effects';
export * from './userOrganizations/selectedOrganization/members/members.effects';