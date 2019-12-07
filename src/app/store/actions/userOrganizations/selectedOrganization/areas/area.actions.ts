import { createAction, props } from '@ngrx/store';
import { AreaModel } from '../../../../../models/area.model';

export const getArea = createAction(
  '[Area Actions] Get Area',
  props<{ payload: string}>()
);

export const getAreaSuccess = createAction(
  '[Area Actions] Get Area Success',
  props<{ payload: AreaModel }>()
);

export const getAreaFail = createAction(
  '[Area Actions] Get Area Fail',
  props<{ payload: any }>()
);