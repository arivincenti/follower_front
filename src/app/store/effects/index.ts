import { AuthEffects } from './auth/auth.effects';
import { OrganizationsEffects } from './organizations/organizations.effects';


export const effects: any[] = [
  AuthEffects,
  OrganizationsEffects
];

export * from './auth/auth.effects';
export * from './organizations/organizations.effects';