import { ActionReducerMap, combineReducers } from '@ngrx/store';
import * as UiReducer from './reducers/ui/ui.reducer';
import * as AuthReducer from './reducers/auth/auth.reducer';
import * as OrganizationsReducer from './reducers/organizations/organizations.reducer';
import * as OrganizationReducer from './reducers/organizations/organization.reducer';

export interface AppState
{
  ui: UiReducer.UiState,
  auth: AuthReducer.AuthState,
  userOrganizations: OrganizationsReducer.OrganizationsState,
  selectedOrganization: OrganizationReducer.SelectedOrganizationState
}
export const appReducers: ActionReducerMap<AppState> = {
  ui: UiReducer.UiReducer,
  auth: AuthReducer.authReducer,
  userOrganizations: OrganizationsReducer.OrganizationsReducer,
  selectedOrganization: OrganizationReducer.OrganizationReducer
}