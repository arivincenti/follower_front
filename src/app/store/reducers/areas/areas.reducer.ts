import { createReducer, Action, on } from '@ngrx/store';
import { AreaModel } from 'src/app/models/area.model';
import * as AreasActions from '../../actions/areas/areas.actions';


export interface AreasState
{
  areas: AreaModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const initialState: AreasState = {
  areas: [],
  loading: false,
  loaded: false,
  error: null
}

export const areasReducer = createReducer(
  initialState,
  on(AreasActions.getOrganizationAreas, (state) => (
    {
      ...state,
      areas: [],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(AreasActions.getOrganizationAreasSuccess, (state, { payload }) => (
    {
      ...state,
      areas: payload,
      loading: false,
      loaded: true,
      error: null
    }
  )),
  on(AreasActions.getOrganizationAreasFail, (state, { payload }) => (
    {
      ...state,
      areas: null,
      loading: false,
      loaded: false,
      error: payload
    }
  )),
  on(AreasActions.clearState, (state) => (
    {
      ...state,
      ...initialState
    }
  )),
)

export function AreasReducer(state: AreasState | undefined, action: Action)
{
  return areasReducer(state, action);
}