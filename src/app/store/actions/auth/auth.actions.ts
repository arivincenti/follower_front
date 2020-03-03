import { createAction, props } from "@ngrx/store";
import { UserModel } from "../../../models/user.model";

export const login = createAction(
  "[Auth Actions] Login",
  props<{ credentials: any }>()
);

export const loginFail = createAction(
  "[Auth Actions] Login Fail",
  props<{ payload: string }>()
);

export const loginSuccess = createAction(
  "[Usuario Actions] Cargar Usuario Success",
  props<{ user: UserModel; token: string }>()
);

export const updateUser = createAction(
  "[Auth Actions] Update user",
  props<{ payload: any }>()
);

export const updateUserSuccess = createAction(
  "[Auth Actions] Update user success",
  props<{ user: UserModel }>()
);

export const updateUserFail = createAction(
  "[Usuario Actions] Update user fail",
  props<{ payload: any }>()
);

export const logout = createAction("[Usuario Actions] Logout");
