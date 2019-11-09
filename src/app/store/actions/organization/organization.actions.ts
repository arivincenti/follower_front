import { createAction, props } from '@ngrx/store';
import { OrganizationModel } from '../../../models/organization.model';

export const getOrganization = createAction(
  '[Organization Actions] Get Organization',
  props<{ payload: string }>()
);

export const getOrganizationSuccess = createAction(
  '[Organization Actions] Get Organization Success',
  props<{ payload: OrganizationModel }>()
);

export const getOrganizationFail = createAction(
  '[Organization Actions] Get Organization Fail',
  props<{ payload: any }>()
);

export const createOrganization = createAction(
  '[Organization Actions] Create Organization',
  props<{ payload: any }>()
);

export const createOrganizationSuccess = createAction(
  '[Organization Actions] Create Organization Success',
  props<{ payload: OrganizationModel }>()
);

export const createOrganizationFail = createAction(
  '[Organization Actions] Create Organization Fail',
  props<{ payload: any }>()
);

export const clearState = createAction(
  '[Organization Actions] Clear State'
);