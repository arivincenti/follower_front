import { AreaModel } from "src/app/models/area.model";
import { createReducer, on, Action } from "@ngrx/store";
import * as AreaActions from "@actions/area";

export interface AreaState {
  area: AreaModel;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const InitialStateArea = {
  area: null,
  loading: false,
  loaded: false,
  error: null,
};

export const areaReducer = createReducer(
  InitialStateArea,
  on(AreaActions.getArea, (state) => ({
    ...state,
    area: null,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(AreaActions.getAreaSuccess, (state, { area }) => ({
    ...state,
    area: { ...area },
    loading: false,
    loaded: true,
    error: null,
  })),
  on(AreaActions.getAreaFail, (state, payload) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(AreaActions.createArea, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(AreaActions.createAreaSuccess, (state, { area }) => ({
    ...state,
    area: { ...area },
    loading: false,
    loaded: true,
    error: null,
  })),
  on(AreaActions.createAreaFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(AreaActions.updateArea, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(AreaActions.updateAreaSuccess, (state, { area }) => ({
    ...state,
    area: { ...area },
    loading: false,
    loaded: true,
    error: null,
  })),
  on(AreaActions.updateAreaFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(AreaActions.activateArea, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(AreaActions.activateAreaSuccess, (state, { area }) => ({
    ...state,
    area: { ...area },
    loading: false,
    loaded: true,
    error: null,
  })),
  on(AreaActions.activateAreaFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(AreaActions.desactivateArea, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(AreaActions.desactivateAreaSuccess, (state, { area }) => ({
    ...state,
    area: { ...area },
    loading: false,
    loaded: true,
    error: null,
  })),
  on(AreaActions.desactivateAreaFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(AreaActions.createAreaMember, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(AreaActions.createAreaMemberSuccess, (state, { area }) => ({
    ...state,
    area: { ...area },
    loading: false,
    loaded: true,
    error: null,
  })),
  on(AreaActions.createAreaMemberFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(AreaActions.deleteAreaMember, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(AreaActions.deleteAreaMemberSuccess, (state, { area }) => ({
    ...state,
    area: { ...area },
    loading: false,
    loaded: true,
    error: null,
  })),
  on(AreaActions.deleteAreaMemberFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(AreaActions.setResponsibleAreaMember, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(AreaActions.setResponsibleAreaMemberSuccess, (state, { area }) => ({
    ...state,
    area: { ...area },
    loading: false,
    loaded: true,
    error: null,
  })),
  on(AreaActions.setResponsibleAreaMemberFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(AreaActions.clear, (state) => ({
    area: null,
    loading: false,
    loaded: false,
    error: null,
  }))
);

export function AreaReducer(state: AreaState | undefined, action: Action) {
  return areaReducer(state, action);
}
