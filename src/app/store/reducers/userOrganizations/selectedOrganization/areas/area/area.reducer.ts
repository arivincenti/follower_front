import { AreaModel } from "src/app/models/area.model";
import { createReducer, on, Action } from "@ngrx/store";
import * as AreaActions from "../../../../../actions/userOrganizations/selectedOrganization/areas/area/area.actions";

export interface AreaState {
  area: AreaModel;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialStateArea: AreaState = {
  area: null,
  loading: false,
  loaded: false,
  error: null
};

export const areaReducer = createReducer(
  initialStateArea,
  on(AreaActions.getArea, state => ({
    ...state,
    area: null,
    loading: true,
    loaded: false,
    error: null
  })),
  on(AreaActions.getAreaSuccess, (state, { payload }) => ({
    ...state,
    area: { ...payload },
    loading: false,
    loaded: true,
    error: null
  })),
  on(AreaActions.getAreaFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload }
  })),
  on(AreaActions.createAreaMember, state => ({
    ...state,
    area: { ...state.area },
    loading: true,
    loaded: false,
    error: null
  })),
  on(AreaActions.createAreaMemberSuccess, (state, { payload }) => ({
    ...state,
    area: { ...payload },
    loading: false,
    loaded: true,
    error: null
  })),
  on(AreaActions.createAreaMemberFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload }
  })),
  on(AreaActions.deleteAreaMember, state => ({
    ...state,
    area: { ...state.area },
    loading: true,
    loaded: false,
    error: null
  })),
  on(AreaActions.deleteAreaMemberSuccess, (state, { payload }) => ({
    ...state,
    area: { ...payload },
    loading: false,
    loaded: true,
    error: null
  })),
  on(AreaActions.deleteAreaMemberFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload }
  })),
  on(AreaActions.clear, state => ({
    ...state,
    area: null,
    loading: false,
    loaded: false,
    error: null
  }))
);

export function AreaReducer(state: AreaState | undefined, action: Action) {
  return areaReducer(state, action);
}
