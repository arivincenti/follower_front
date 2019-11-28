import { createAction, props } from '@ngrx/store';

export const selectTheme = createAction(
  '[UI Actions] Select Theme Modal',
  props<{ payload: string }>()
);

export const clearState = createAction(
  '[UI Actions] Clear State'
);