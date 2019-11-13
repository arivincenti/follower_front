import { createAction, props } from '@ngrx/store';

export const showOrganizationModal = createAction(
  '[UI Actions] Show Organization Modal',
);

export const showAreaModal = createAction(
  '[UI Actions] Show Area Modal',
);

export const clearState = createAction(
  '[UI Actions] Clear State'
);