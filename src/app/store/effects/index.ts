import { AuthEffects } from './auth/auth.effects';
import { OrganizationEffects } from './organizations/organization.effects';
import { OrganizationsEffects } from './organizations/organizations.effects';
import { AreasEffects } from './areas/areas.effects';


export const effects: any[] = [
  AuthEffects,
  OrganizationEffects,
  OrganizationsEffects,
  AreasEffects
];

export * from './auth/auth.effects';
export * from './organizations/organization.effects';
export * from './organizations/organizations.effects';
export * from './areas/areas.effects';