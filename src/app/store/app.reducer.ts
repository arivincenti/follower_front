import { ActionReducerMap } from '@ngrx/store';
import * as AuthReducer from './reducers/auth/auth.reducer';
import * as OrganizationReducer from './reducers/organizations/organization.reducer';
import * as OrganizationsReducer from './reducers/organizations/organizations.reducer';
import * as AreasReducer from './reducers/areas/areas.reducer';

export interface AppState
{
  auth: AuthReducer.AuthState,
  organization: OrganizationReducer.OrganizationState,
  organizations: OrganizationsReducer.OrganizationsState,
  areas: AreasReducer.AreasState

}
export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer,
  organization: OrganizationReducer.organizationReducer,
  organizations: OrganizationsReducer.organizationsReducer,
  areas: AreasReducer.areasReducer
}