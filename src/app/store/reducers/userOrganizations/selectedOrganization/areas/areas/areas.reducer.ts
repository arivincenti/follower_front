import * as AreasActions from '../../../../../actions/userOrganizations/selectedOrganization/areas/areas/areas.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { AreaModel } from 'src/app/models/area.model';


export interface AreasState
{
  areas: AreaModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const InitialStateAreas = {
  areas: [],
  loading: false,
  loaded: false,
  error: null
}

export const areasReducer = createReducer(
  InitialStateAreas,
  on(AreasActions.getAreas, (state) => (
    {
      ...state,
      areas: [],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(AreasActions.getAreasSuccess, (state, { payload }) => (
    {
      ...state,
      areas: [...payload],
      loading: false,
      loaded: true,
      error: null
    }
  )),
  on(AreasActions.getAreasFail, (state, { payload }) => (
    {
      ...state,
      areas: [],
      loading: false,
      loaded: true,
      error: { ...payload }
    }
  )),
  on(AreasActions.createArea, (state) => (
    {
      ...state,
      areas: [...state.areas],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(AreasActions.createAreaSuccess, (state, { payload }) => (
    {
      ...state,
      areas: [...state.areas, { ...payload }],
      loading: false,
      loaded: true
    }
  )),
  on(AreasActions.createAreaFail, (state, { payload }) => (
    {
      ...state,
      areas: [...state.areas],
      loading: false,
      loaded: false,
      error: { ...payload }
    }
  )),
  on(AreasActions.updateArea, (state) => (
    {
      ...state,
      areas: [...state.areas],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(AreasActions.updateAreaSuccess, (state, { payload }) =>
  {
    var index = state.areas.findIndex(data => data._id === payload._id);
    state.areas.splice(index, 1, { ...payload });

    return {
      ...state,
      areas: [...state.areas],
      loading: false,
      loaded: true
    }
  }
  ),
  on(AreasActions.updateAreaFail, (state, { payload }) => (
    {
      ...state,
      areas: [...state.areas],
      loading: false,
      loaded: false,
      error: { ...payload }
    }
  )),
  on(AreasActions.deleteArea, (state) => (
    {
      ...state,
      areas: [...state.areas],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(AreasActions.deleteAreaSuccess, (state, { payload }) =>
  {
    var index = state.areas.findIndex(data => data._id === payload._id);
    state.areas.splice(index, 1, { ...payload });

    return {
      ...state,
      areas: [...state.areas],
      loading: false,
      loaded: true
    }
  }
  ),
  on(AreasActions.deleteAreaFail, (state, { payload }) => (
    {
      ...state,
      loading: false,
      loaded: false,
      error: { ...payload }
    }
  ))
);

export function AreasReducer(state: AreasState | undefined, action: Action)
{
  return areasReducer(state, action);
}