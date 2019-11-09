import { AuthEffects } from './auth/auth.effects';
import { OrganizationsEffects } from './organizations/organizations.effects';
import { OrganizationEffects } from './organization/organization.effects';
import { OrganizationAreasEffects } from './organization/organizationAreas.effects';
import { OrganizationUserAreasEffects } from './organization/organizationUserAreas.effects';


export const effects: any[] = [
  AuthEffects,
  OrganizationsEffects,
  OrganizationEffects,
  OrganizationAreasEffects,
  OrganizationUserAreasEffects,
];

export * from './auth/auth.effects';
export * from './organizations/organizations.effects';
export * from './organization/organization.effects';
export * from './organization/organizationAreas.effects';
export * from './organization/organizationUserAreas.effects';