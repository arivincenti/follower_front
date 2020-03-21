import { ActionReducerMap } from "@ngrx/store";
import * as UiReducer from "./reducers/ui/ui.reducer";
import * as AuthReducer from "./reducers/auth/auth.reducer";
import * as UserOrganizationsReducer from "./reducers/userOrganizations/userOrganizations.reducer";
import { InjectionToken } from "@angular/core";

export interface AppState {
  ui: UiReducer.UiState;
  auth: AuthReducer.AuthState;
  userOrganizations: UserOrganizationsReducer.state;
}
export const appReducers: ActionReducerMap<AppState> = {
  ui: UiReducer.UiReducer,
  auth: AuthReducer.authReducer,
  userOrganizations: UserOrganizationsReducer.userOrganizationReducer
};

export const REDUCERS_TOKEN = new InjectionToken<ActionReducerMap<AppState>>(
  "App Reducers"
);
export const reducerProvider = {
  provide: REDUCERS_TOKEN,
  useValue: appReducers
};
