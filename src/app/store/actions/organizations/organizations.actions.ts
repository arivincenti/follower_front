import { createAction, props } from '@ngrx/store';
import { OrganizationModel } from '../../../models/organization.model';
import { AreaModel } from 'src/app/models/area.model';

export const getUserOrganizations = createAction(
  '[Organizations Actions] Get User Organizations',
  props<{ payload: string }>()
);

export const getUserOrganizationsSuccess = createAction(
  '[Organizations Actions] Get User Organizations Success',
  props<{ payload: OrganizationModel[] }>()
);

export const getUserOrganizationsFail = createAction(
  '[Organizations Actions] Get User Organizations Fail',
  props<{ payload: any }>()
);

export const createOrganization = createAction(
  '[Organizations Actions] Create Organization',
  props<{ payload: any }>()
);

export const createOrganizationSuccess = createAction(
  '[Organizations Actions] Create Organization Success',
  props<{ organization: OrganizationModel }>()
);

export const createOrganizationFail = createAction(
  '[Organizations Actions] Create Organization Fail',
  props<{ payload: any }>()
);

export const updateOrganization = createAction(
  '[Organizations Actions] Update Organization',
  props<{ organizationId: string, payload: any }>()
);

export const updateOrganizationSuccess = createAction(
  '[Organizations Actions] Update Organization Success',
  props<{ organization: OrganizationModel }>()
);

export const updateOrganizationFail = createAction(
  '[Organizations Actions] Update Organization Fail',
  props<{ payload: any }>()
);

export const deleteOrganization = createAction(
  '[Organizations Actions] Delete Organization',
  props<{ organization: string }>()
);

export const deleteOrganizationSuccess = createAction(
  '[Organizations Actions] Delete Organization Success',
  props<{ organization: OrganizationModel }>()
);

export const deleteOrganizationFail = createAction(
  '[Organizations Actions] Delete Organization Fail',
  props<{ payload: any }>()
);

export const clearState = createAction(
  '[Organizations Actions] Clear State'
);