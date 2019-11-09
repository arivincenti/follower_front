import { createAction, props } from '@ngrx/store';
import { AreaModel } from '../../../models/area.model';

export const getOrganizationAreas = createAction(
  '[Organizations Actions] Get Organization Areas',
  props<{ organization: string }>()
);

export const getOrganizationAreasSuccess = createAction(
  '[Organizations Actions] Get Organization Areas Success',
  props<{ areas: AreaModel[] }>()
);

export const getOrganizationAreasFail = createAction(
  '[Organizations Actions] Get Organization Areas Fail',
  props<{ payload: any }>()
);

export const clearState = createAction(
  '[Organization Areas Actions] Clear State'
);