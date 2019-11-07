import { createAction, props } from '@ngrx/store';
import { AreaModel } from 'src/app/models/area.model';

export const getOrganizationAreas = createAction(
  '[Areas Actions] Get Organization Areas',
  props<{ payload: string }>()
);

export const getOrganizationAreasSuccess = createAction(
  '[Areas Actions] Get Organization Areas Success',
  props<{ payload: AreaModel[] }>()
);

export const getOrganizationAreasFail = createAction(
  '[Areas Actions] Get Organization Areas Fail',
  props<{ payload: any }>()
);

export const clearState = createAction(
  '[Areas Actions] Clear State'
);