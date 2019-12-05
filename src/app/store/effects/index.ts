import { UiEffects } from './ui/ui.effects';
import { AuthEffects } from './auth/auth.effects';
import { AreasEffects } from './areas/areas.effects';
import { OrganizationsEffects } from './userOrganizations/organizations/organizations.effects';
import { OrganizationEffects } from './userOrganizations/selectedOrganization/organization.effects';
import { OrganizationAreasEffects } from './userOrganizations/selectedOrganization/organizationAreas.effects';
import { OrganizationUserAreasEffects } from './userOrganizations/selectedOrganization/organizationUserAreas.effects';


export const effects: any[] = [
  UiEffects,
  AuthEffects,
  AreasEffects,
  OrganizationsEffects,
  OrganizationEffects,
  OrganizationAreasEffects,
  OrganizationUserAreasEffects
];

export * from './ui/ui.effects';
export * from './auth/auth.effects';
export * from './areas/areas.effects';
export * from './userOrganizations/organizations/organizations.effects';
export * from './userOrganizations/selectedOrganization/organization.effects';
export * from './userOrganizations/selectedOrganization/organizationAreas.effects';
export * from './userOrganizations/selectedOrganization/organizationUserAreas.effects';