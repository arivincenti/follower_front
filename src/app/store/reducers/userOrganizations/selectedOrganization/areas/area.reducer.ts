import { AreaModel } from 'src/app/models/area.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as AreaActions from '../../../../actions/userOrganizations/selectedOrganization/areas/area.actions';

export interface AreaState
{
  area: AreaModel,
  loading: boolean,
  loaded: boolean,
  error: any
}

export const initialAreaState: AreaState = {
  area: null,
  loading: false,
  loaded: false,
  error: null
}


export const areaReducer = createReducer(
  initialAreaState,
  on(AreaActions.getArea, (state) => (
    {
      ...state,
        area: null,
        loading: true,
        loaded: false,
        error: null
      }
  )),
  on(AreaActions.getAreaSuccess, (state, { payload }) => (
    {
      ...state,
        area: { ...payload },
        loading: false,
        loaded: true,
        error: null
      }
  )),
  on(AreaActions.getAreaFail, (state, { payload }) => (
    {
      ...state,
        loading: false,
        loaded: false,
        error: { ...payload }
      }
  ))
)


export function AreaReducer(state: AreaState | undefined, action: Action)
{
  return areaReducer(state, action);
}