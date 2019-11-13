import { ActionReducerMap } from '@ngrx/store';
import * as UiReducer from './reducers/ui/ui.reducer';
import * as AuthReducer from './reducers/auth/auth.reducer';
import * as OrganizationsReducer from './reducers/organizations/organizations.reducer';
// import * as OrganizationAreasReducer from './reducers/organization/organizationAreas.reducer';
// import * as OrganizationUserAreasReducer from './reducers/organization/organizationUserAreas.reducer';

export interface AppState
{
  ui: UiReducer.UiState,
  auth: AuthReducer.AuthState,
  userOrganizations: OrganizationsReducer.State
}
export const appReducers: ActionReducerMap<AppState> = {
  ui: UiReducer.UiReducer,
  auth: AuthReducer.authReducer,
  userOrganizations: OrganizationsReducer.OrganizationsReducer
}