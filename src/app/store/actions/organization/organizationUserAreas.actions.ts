import { createAction, props } from '@ngrx/store';
import { AreaModel } from '../../../models/area.model';

export const getOrganizationUserAreas = createAction(
  '[Organizations Actions] Get Organization User Areas',
  props<{ user: string, organization: string }>()
);

export const getOrganizationUserAreasSuccess = createAction(
  '[Organizations Actions] Get Organization Areas User Success',
  props<{ userAreas: AreaModel[] }>()
);

export const getOrganizationUserAreasFail = createAction(
  '[Organizations Actions] Get Organization Areas User Fail',
  props<{ payload: any }>()
);

export const clearState = createAction(
  '[Organization User Areas Actions] Clear State'
);