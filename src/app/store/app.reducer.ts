import { ActionReducerMap } from '@ngrx/store';
import * as UiReducer from './reducers/ui/ui.reducer';
import * as AuthReducer from './reducers/auth/auth.reducer';
import * as OrganizationsReducer from './reducers/organizations/organizations.reducer';
import * as OrganizationReducer from './reducers/organization/organization.reducer';
import * as OrganizationAreasReducer from './reducers/organization/organizationAreas.reducer';
import * as OrganizationUserAreasReducer from './reducers/organization/organizationUserAreas.reducer';

export interface AppState
{
  ui: UiReducer.UiState,
  auth: AuthReducer.AuthState,
  organizationSelected: OrganizationReducer.OrganizationState,
  userOrganizations: OrganizationsReducer.OrganizationsState,
  organizationAreas: OrganizationAreasReducer.OrganizationAreasState,
  organizationUserAreas: OrganizationUserAreasReducer.OrganizationUserAreasState,
}
export const appReducers: ActionReducerMap<AppState> = {
  ui: UiReducer.UiReducer,
  auth: AuthReducer.authReducer,
  organizationSelected: OrganizationReducer.OrganizationReducer,
  userOrganizations: OrganizationsReducer.organizationsReducer,
  organizationAreas: OrganizationAreasReducer.OrganizationAreasReducer,
  organizationUserAreas: OrganizationUserAreasReducer.OrganizationUserAreasReducer,
}