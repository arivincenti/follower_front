import { createAction, props } from '@ngrx/store';
import { OrganizationModel } from 'src/app/models/organization.model';


export const getOrganization = createAction(
  '[Organizations Actions] Get Organization',
  props<{ organization: string, user: string }>()
);

export const getOrganizationSuccess = createAction(
  '[Organizations Actions] Get Organization Success',
  props<{ payload: OrganizationModel }>()
);

export const getOrganizationFail = createAction(
  '[Organizations Actions] Get Organization Fail',
  props<{ payload: any }>()
);

export const clearSelectedOrganizationState = createAction(
  '[Organizations Actions] Clear Selected Organization State'
);