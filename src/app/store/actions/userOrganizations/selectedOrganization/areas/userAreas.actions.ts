//ESTE ARCHIVO NO DEBERIA EXISTIR MAS CON LA MODIFICACION DE LAS AREAS DENTRO DEL MIEMBRO
import { createAction, props } from '@ngrx/store';
import { AreaModel } from '../../../../../models/area.model';

export const getUserAreas = createAction(
  '[User Areas Actions] Get User Areas',
  props<{ user: string, organization: string }>()
);

export const getUserAreasSuccess = createAction(
  '[User Areas Actions] Get User Areas Success',
  props<{ payload: AreaModel[] }>()
);

export const getUserAreasFail = createAction(
  '[User Areas Actions] Get User Areas Fail',
  props<{ payload: any }>()
);