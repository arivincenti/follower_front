import { UiEffects } from './ui/ui.effects';
import { AuthEffects } from './auth/auth.effects';
import { OrganizationsEffects } from './organizations/organizations.effects';


export const effects: any[] = [
  UiEffects,
  AuthEffects,
  OrganizationsEffects
];

export * from './ui/ui.effects';
export * from './auth/auth.effects';
export * from './organizations/organizations.effects';