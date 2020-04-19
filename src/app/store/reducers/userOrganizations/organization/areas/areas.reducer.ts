import * as AreasActions from "@actions/areas";
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
  error: null,
};

export const areasReducer = createReducer(
  InitialStateAreas,
  on(AreasActions.getAreas, (state) => ({
    ...state,
    areas: [],
    loading: true,
    loaded: false,
    error: null,
  })),
  on(AreasActions.getAreasSuccess, (state, { payload }) => ({
    ...state,
    areas: [...payload],
    loading: false,
    loaded: true,
    error: null,
  })),
  on(AreasActions.getAreasFail, (state, { payload }) => ({
    ...state,
    areas: [],
    loading: false,
    loaded: true,
    error: { ...payload },
  })),
  // on(AreasActions.createArea, (state) => ({
  //   ...state,
  //   loading: true,
  //   loaded: false,
  //   error: null,
  // })),
  // on(AreasActions.createAreaSuccess, (state, { area }) => ({
  //   ...state,
  //   areas: [...state.areas, { ...area }],
  //   loading: false,
  //   loaded: true,
  // })),
  // on(AreasActions.createAreaFail, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   loaded: false,
  //   error: { ...payload },
  // })),
  // on(AreasActions.updateArea, (state) => ({
  //   ...state,
  //   loading: true,
  //   loaded: false,
  //   error: null,
  // })),
  // on(AreasActions.updateAreaSuccess, (state, { payload }) => {
  //   var index = state.areas.findIndex((data) => data._id === payload._id);
  //   state.areas.splice(index, 1, { ...payload });

  //   return {
  //     ...state,
  //     areas: [...state.areas],
  //     loading: false,
  //     loaded: true,
  //   };
  // }),
  // on(AreasActions.updateAreaFail, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   loaded: false,
  //   error: { ...payload },
  // })),
  // on(AreasActions.activateArea, (state) => ({
  //   ...state,
  //   loading: true,
  //   loaded: false,
  //   error: null,
  // })),
  // on(AreasActions.activateAreaSuccess, (state, { payload }) => {
  //   var index = state.areas.findIndex((data) => data._id === payload._id);
  //   state.areas.splice(index, 1, { ...payload });

  //   return {
  //     ...state,
  //     areas: [...state.areas],
  //     loading: false,
  //     loaded: true,
  //   };
  // }),
  // on(AreasActions.activateAreaFail, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   loaded: false,
  //   error: { ...payload },
  // })),
  // on(AreasActions.desactivateArea, (state) => ({
  //   ...state,
  //   loading: true,
  //   loaded: false,
  //   error: null,
  // })),
  // on(AreasActions.desactivateAreaSuccess, (state, { payload }) => {
  //   var index = state.areas.findIndex((data) => data._id === payload._id);
  //   state.areas.splice(index, 1, { ...payload });

  //   return {
  //     ...state,
  //     areas: [...state.areas],
  //     loading: false,
  //     loaded: true,
  //   };
  // }),
  // on(AreasActions.desactivateAreaFail, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   loaded: false,
  //   error: { ...payload },
  // })),
  // on(AreasActions.createAreaMember, (state) => ({
  //   ...state,
  //   loading: true,
  //   loaded: false,
  //   error: null,
  // })),
  // on(AreasActions.createAreaMemberSuccess, (state, { payload }) => {
  //   var index = state.areas.findIndex((data) => data._id === payload._id);
  //   state.areas.splice(index, 1, { ...payload });

  //   return {
  //     ...state,
  //     areas: [...state.areas],
  //     loading: false,
  //     loaded: true,
  //   };
  // }),
  // on(AreasActions.createAreaMemberFail, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   loaded: false,
  //   error: { ...payload },
  // })),
  // on(AreasActions.deleteAreaMember, (state) => ({
  //   ...state,
  //   loading: true,
  //   loaded: false,
  //   error: null,
  // })),
  // on(AreasActions.deleteAreaMemberSuccess, (state, { payload }) => {
  //   var index = state.areas.findIndex((data) => data._id === payload._id);
  //   state.areas.splice(index, 1, { ...payload });

  //   return {
  //     ...state,
  //     areas: [...state.areas],
  //     loading: false,
  //     loaded: true,
  //   };
  // }),
  // on(AreasActions.deleteAreaMemberFail, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   loaded: false,
  //   error: { ...payload },
  // })),
  // on(AreasActions.setResponsibleAreaMember, (state) => ({
  //   ...state,
  //   loading: true,
  //   loaded: false,
  //   error: null,
  // })),
  // on(AreasActions.setResponsibleAreaMemberSuccess, (state, { payload }) => {
  //   var index = state.areas.findIndex((data) => data._id === payload._id);
  //   state.areas.splice(index, 1, { ...payload });

  //   return {
  //     ...state,
  //     areas: [...state.areas],
  //     loading: false,
  //     loaded: true,
  //   };
  // }),
  // on(AreasActions.setResponsibleAreaMemberFail, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   loaded: false,
  //   error: { ...payload },
  // })),
  on(AreasActions.addCreatedAreaToList, (state, { area }) => ({
    ...state,
    areas: [...state.areas, { ...area }],
    loading: false,
    loaded: true,
  })),
  on(AreasActions.updateAreasList, (state, { area }) => {
    var index = state.areas.findIndex((data) => data._id === area._id);
    state.areas.splice(index, 1, { ...area });

    return {
      ...state,
      areas: [...state.areas],
      loading: false,
      loaded: true,
    };
  })
);

export function AreasReducer(state: AreasState | undefined, action: Action) {
  return areasReducer(state, action);
}
