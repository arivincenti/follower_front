import { createAction, props } from "@ngrx/store";

export const selectTheme = createAction(
  "[UI Actions] Select Theme",
  props<{ payload: string }>()
);

export const connectionStatus = createAction(
  "[UI Actions] Connection Status",
  props<{ payload: boolean }>()
);

export const clearState = createAction("[UI Actions] Clear State");
