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

export const createOrganization = createAction(
  '[Organization Actions] Create Organization',
  props<{ payload: any }>()
);

export const createOrganizationSuccess = createAction(
  '[Organization Actions] Create Organization Success',
  props<{ organization: OrganizationModel }>()
);

export const createOrganizationFail = createAction(
  '[Organization Actions] Create Organization Fail',
  props<{ payload: any }>()
);

export const deleteOrganization = createAction(
  '[Organization Actions] Delete Organization',
  props<{ organization: string }>()
);

export const deleteOrganizationSuccess = createAction(
  '[Organization Actions] Delete Organization Success',
  props<{ organization: OrganizationModel }>()
);

export const deleteOrganizationFail = createAction(
  '[Organization Actions] Delete Organization Fail',
  props<{ payload: any }>()
);

export const clearState = createAction(
  '[Organizations Actions] Clear State'
);