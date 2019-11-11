import { createAction, props } from '@ngrx/store';
import { OrganizationModel } from '../../../models/organization.model';
import { AreaModel } from 'src/app/models/area.model';

export const getOrganization = createAction(
  '[Organization Actions] Get Organization',
  props<{ organization: string, user: string }>()
);

export const getOrganizationSuccess = createAction(
  '[Organization Actions] Get Organization Success',
  props<{ payload: OrganizationModel }>()
);

export const getOrganizationFail = createAction(
  '[Organization Actions] Get Organization Fail',
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

export const getOrganizationAreas = createAction(
  '[Organization Actions] Get Organization Areas',
  props<{ organization: string }>()
);

export const getOrganizationAreasSuccess = createAction(
  '[Organization Actions] Get Organization Areas Success',
  props<{ areas: AreaModel[] }>()
);

export const getOrganizationAreasFail = createAction(
  '[Organization Actions] Get Organization Areas Fail',
  props<{ payload: any }>()
);

export const getOrganizationUserAreas = createAction(
  '[Organization Actions] Get Organization User Areas',
  props<{ user: string, organization: string }>()
);

export const getOrganizationUserAreasSuccess = createAction(
  '[Organization Actions] Get Organization Areas User Success',
  props<{ userAreas: AreaModel[] }>()
);

export const getOrganizationUserAreasFail = createAction(
  '[Organization Actions] Get Organization Areas User Fail',
  props<{ payload: any }>()
);


export const clearState = createAction(
  '[Organization Actions] Clear State'
);