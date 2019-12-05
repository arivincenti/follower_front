import * as OrganizationAreasActions from '../../../actions/userOrganizations/selectedOrganization/organizationAreas.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { AreaModel } from 'src/app/models/area.model';


export interface OrganizationAreasState
{
  areas: AreaModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const InitialStateOrganizationAreas = {
  areas: [],
  loading: false,
  loaded: false,
  error: null
}

export const organizationAreasReducer = createReducer(
  InitialStateOrganizationAreas,
  on(OrganizationAreasActions.getOrganizationAreas, (state) => (
    {
      ...state,
      areas: [],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(OrganizationAreasActions.getOrganizationAreasSuccess, (state, { payload }) => (
    {
      ...state,
      areas: [...payload],
      loading: false,
      loaded: true,
      error: null
    }
  )),
  on(OrganizationAreasActions.getOrganizationAreasFail, (state, { payload }) => (
    {
      ...state,
      areas: [],
      loading: false,
      loaded: true,
      error: { ...payload }
    }
  )),
  on(OrganizationAreasActions.createOrganizationArea, (state) => (
    {
      ...state,
      areas: [...state.areas],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(OrganizationAreasActions.createOrganizationAreaSuccess, (state, { payload }) => (
    {
      ...state,
      areas: [...state.areas, { ...payload }],
      loading: false,
      loaded: true
    }
  )),
  on(OrganizationAreasActions.createOrganizationAreaFail, (state, { payload }) => (
    {
      ...state,
      areas: [...state.areas],
      loading: false,
      loaded: false,
      error: { ...payload }
    }
  )),
  on(OrganizationAreasActions.updateOrganizationArea, (state) => (
    {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(OrganizationAreasActions.updateOrganizationAreaSuccess, (state, { payload }) =>
  {
    return {
      ...state,
      areas: [...state.areas.filter(area => area._id !== payload._id), { ...payload }],
      loading: false,
      loaded: true
    }
  }
  ),
  on(OrganizationAreasActions.updateOrganizationAreaFail, (state, { payload }) => (
    {
      ...state,
      loading: false,
      loaded: false,
      error: { ...payload }
    }
  )),
  on(OrganizationAreasActions.deleteOrganizationArea, (state) => (
    {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(OrganizationAreasActions.deleteOrganizationAreaSuccess, (state, { payload }) =>
  {
    return {
      ...state,
      areas: [...state.areas.filter(area => area._id !== payload._id), { ...payload }],
      loading: false,
      loaded: true
    }
  }
  ),
  on(OrganizationAreasActions.deleteOrganizationAreaFail, (state, { payload }) => (
    {
      ...state,
      loading: false,
      loaded: false,
      error: { ...payload }
    }
  ))
);

export function OrganizationAreasReducer(state: OrganizationAreasState | undefined, action: Action)
{
  return organizationAreasReducer(state, action);
}