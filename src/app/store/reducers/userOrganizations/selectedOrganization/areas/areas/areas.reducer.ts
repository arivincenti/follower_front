import * as AreasActions from "../../../../../actions/userOrganizations/selectedOrganization/areas/areas/areas.actions";
import { createReducer, on, Action } from "@ngrx/store";
import { AreaModel } from "src/app/models/area.model";

export interface AreasState {
  areas: AreaModel[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const InitialStateAreas = {
  areas: [],
  loading: false,
  loaded: false,
  error: null
};

export const areasReducer = createReducer(
  InitialStateAreas,
  on(AreasActions.getAreas, state => ({
    ...state,
    areas: [],
    loading: true,
    loaded: false,
    error: null
  })),
  on(AreasActions.getAreasSuccess, (state, { payload }) => ({
    ...state,
    areas: [...payload],
    loading: false,
    loaded: true,
    error: null
  })),
  on(AreasActions.getAreasFail, (state, { payload }) => ({
    ...state,
    areas: [],
    loading: false,
    loaded: true,
    error: { ...payload }
  })),
  on(AreasActions.createArea, state => ({
    ...state,
    areas: [...state.areas],
    loading: true,
    loaded: false,
    error: null
  })),
  on(AreasActions.createAreaSuccess, (state, { payload }) => ({
    ...state,
    areas: [...state.areas, { ...payload }],
    loading: false,
    loaded: true
  })),
  on(AreasActions.createAreaFail, (state, { payload }) => ({
    ...state,
    areas: [...state.areas],
    loading: false,
    loaded: false,
    error: { ...payload }
  })),
  on(AreasActions.updateAreasList, (state, { area }) => {
    var index = state.areas.findIndex(data => data._id === area._id);
    state.areas.splice(index, 1, { ...area });

    return {
      ...state,
      areas: [...state.areas],
      loading: false,
      loaded: true
    };
  })
);

export function AreasReducer(state: AreasState | undefined, action: Action) {
  return areasReducer(state, action);
}
