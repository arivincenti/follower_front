import { createAction, props } from '@ngrx/store';
import { OrganizationModel } from '../../../models/organization.model';

export const getOrganizations = createAction(
  '[Organizations Actions] Get Organizations',
  props<{ payload: string }>()
);

export const getOrganizationsSuccess = createAction(
  '[Organizations Actions] Get Organizations Success',
  props<{ payload: OrganizationModel[] }>()
);

export const getOrganizationsFail = createAction(
  '[Organizations Actions] Get Organizations Fail',
  props<{ payload: any }>()
);

export const clearState = createAction(
  '[Organizations Actions] Clear State'
);