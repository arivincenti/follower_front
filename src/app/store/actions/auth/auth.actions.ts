import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../../models/user.model';

export const login = createAction(
  '[Auth Actions] Login',
  props<{ credentials: any }>()
);

export const loginFail = createAction(
  '[Auth Actions] Login Fail',
  props<{ payload: string }>()
);

export const loginSuccess = createAction(
  '[Usuario Actions] Cargar Usuario Success',
  props<{ user: UserModel, token: string }>()
);

export const logout = createAction(
  '[Usuario Actions] Logout'
);