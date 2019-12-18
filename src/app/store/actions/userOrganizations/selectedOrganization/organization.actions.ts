import { createAction, props } from '@ngrx/store';
import { OrganizationModel } from 'src/app/models/organization.model';


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

export const clearSelectedOrganizationState = createAction(
  '[Organization Actions] Clear Selected Organization State'
);