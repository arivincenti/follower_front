import { UiEffects } from './ui/ui.effects';
import { AuthEffects } from './auth/auth.effects';
// import { AreasEffects } from './areas/areas.effects';
import { OrganizationsEffects } from './organizations/organizations.effects';
import { OrganizationEffects } from './organizations/organization.effects';


export const effects: any[] = [
  UiEffects,
  AuthEffects,
  // AreasEffects,
  OrganizationsEffects,
  OrganizationEffects
];

export * from './ui/ui.effects';
export * from './auth/auth.effects';
// export * from './areas/areas.effects';
export * from './organizations/organizations.effects';
export * from './organizations/organization.effects';