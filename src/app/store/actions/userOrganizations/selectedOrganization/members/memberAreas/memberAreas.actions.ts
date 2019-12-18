import { createAction, props } from '@ngrx/store';
import { AreaModel } from 'src/app/models/area.model';

export const getMemberAreas = createAction(
  '[Member Areas Actions] Get Member Areas',
  props<{ user: string, organization: string }>()
);

export const getMemberAreasSuccess = createAction(
  '[Member Areas Actions] Get Member Areas Success',
  props<{ payload: AreaModel[] }>()
);

export const getMemberAreasFail = createAction(
  '[Member Areas Actions] Get Member Areas Fail',
  props<{ payload: any }>()
);
