import { createReducer, on, Action } from "@ngrx/store";
import * as AuthActions from "../../actions/auth/auth.actions";
import { UserModel } from "src/app/models/user.model";

export interface AuthState {
  user: UserModel;
  token: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: AuthState = {
  user: null,
  token: "",
  loading: false,
  loaded: false,
  error: null
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    loading: false,
    loaded: true,
    user: action.user,
    token: action.token
  })),
  on(AuthActions.loginFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload
  })),
  on(AuthActions.updateUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: { ...user }
  })),
  on(AuthActions.updateUserFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload
  })),
  on(AuthActions.logout, state => ({
    ...state,
    loading: false,
    loaded: false,
    user: null,
    token: ""
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return AuthReducer(state, action);
}
