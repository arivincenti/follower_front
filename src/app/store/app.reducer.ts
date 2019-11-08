import { ActionReducerMap } from '@ngrx/store';
import * as AuthReducer from './reducers/auth/auth.reducer';
import * as OrganizationsReducer from './reducers/organizations/organizations.reducer';

export interface AppState
{
  auth: AuthReducer.AuthState,
  organizations: OrganizationsReducer.OrganizationsState,
}
export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer,
  organizations: OrganizationsReducer.organizationsReducer,
}