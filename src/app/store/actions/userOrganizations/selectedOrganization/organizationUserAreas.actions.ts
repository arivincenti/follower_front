import { createAction, props } from '@ngrx/store';
import { AreaModel } from '../../../../models/area.model';

export const getOrganizationUserAreas = createAction(
  '[Organizations Actions] Get Organization User Areas',
  props<{ user: string, organization: string }>()
);

export const getOrganizationUserAreasSuccess = createAction(
  '[Organizations Actions] Get Organization User Areas Success',
  props<{ payload: AreaModel[] }>()
);

export const getOrganizationUserAreasFail = createAction(
  '[Organizations Actions] Get Organization User Areas Fail',
  props<{ payload: any }>()
);