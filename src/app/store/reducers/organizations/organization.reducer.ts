import { createReducer, on, Action, ActionReducer, combineReducers } from '@ngrx/store';
import * as OrganizationActions from '../../actions/organizations/organization.actions';
import { OrganizationModel } from '../../../models/organization.model';
import { AreaModel } from 'src/app/models/area.model';


export interface Areas
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

export interface SelectedArea
{
  area: AreaModel,
  loading: boolean,
  loaded: boolean,
  error: any
}

export const InitialStateSelectedArea = {
  area: null,
  loading: false,
  loaded: false,
  error: null
}

export interface OrganizationAreas
{
  organizationAreas: Areas,
  selectedArea: SelectedArea
}

export const InitialStateOrganizationAreas = {
  organizationAreas: InitialStateAreas,
  selectedArea: InitialStateSelectedArea
}

export interface OrganizationUserAreas
{
  areas: AreaModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const InitialStateOrganizationUserAreas = {
  areas: [],
  loading: false,
  loaded: false,
  error: null
}

export interface Organization
{
  organization: OrganizationModel,
  loading: boolean,
  loaded: boolean,
  error: any
}

export const InitialStateOrganization = {
  organization: null,
  loading: false,
  loaded: false,
  error: null
}

export interface SelectedOrganizationState
{
  organization: Organization,
  organizationAreas: OrganizationAreas,
  organizationUserAreas: OrganizationUserAreas
}

export const initialSelectedOrganizationState: SelectedOrganizationState = {
  organization: InitialStateOrganization,
  organizationAreas: InitialStateOrganizationAreas,
  organizationUserAreas: InitialStateOrganizationUserAreas
}


export const organizationReducer = createReducer(
  initialSelectedOrganizationState,
  on(OrganizationActions.getOrganization, (state) => (
    {
      ...state,
      organization: {
        organization: null,
        loading: true,
        loaded: false,
        error: null
      }
    }
  )),
  on(OrganizationActions.getOrganizationSuccess, (state, { payload }) => (
    {
      ...state,
      organization: {
        ...state.organization,
        organization: { ...payload },
        loading: false,
        loaded: true
      }
    }
  )),
  on(OrganizationActions.getOrganizationFail, (state, { payload }) => (
    {
      ...state,
      organization: {
        ...state.organization,
        organization: null,
        loading: false,
        loaded: false,
        error: { ...payload }
      }
    }
  )),
  on(OrganizationActions.getOrganizationAreas, (state) => (
    {
      ...state,
      organizationAreas: {
        ...state.organizationAreas,
        organizationAreas: {
          ...state.organizationAreas.organizationAreas,
          areas: [],
          loading: true,
          loaded: false,
          error: null
        }
      }
    }
  )),
  on(OrganizationActions.getOrganizationAreasSuccess, (state, { areas }) => (
    {
      ...state,
      organizationAreas: {
        ...state.organizationAreas,
        organizationAreas: {
          areas: [...areas],
          loading: false,
          loaded: true,
          error: null
        }
      }
    }
  )),
  on(OrganizationActions.getOrganizationAreasFail, (state, { payload }) => (
    {
      ...state,
      organizationAreas: {
        ...state.organizationAreas,
        organizationAreas: {
          areas: [],
          loading: false,
          loaded: true,
          error: { ...payload }
        }
      }
    }
  )),
  on(OrganizationActions.createOrganizationArea, (state) => (
    {
      ...state,
      organizationAreas: {
        ...state.organizationAreas,
        organizationAreas: {
          areas: [...state.organizationAreas.organizationAreas.areas],
          loading: true,
          loaded: false,
          error: null
        }
      }
    }
  )),
  on(OrganizationActions.createOrganizationAreaSuccess, (state, { area }) => (
    {
      ...state,
      organizationAreas: {
        ...state.organizationAreas,
        organizationAreas: {
          ...state.organizationAreas.organizationAreas,
          areas: [...state.organizationAreas.organizationAreas.areas, { ...area }],
          loading: false,
          loaded: true
        }
      }
    }
  )),
  on(OrganizationActions.getOrganizationUserAreas, (state) => (
    {
      ...state,
      organizationUserAreas: {
        ...state.organizationUserAreas,
        areas: [],
        loading: true,
        loaded: false,
        error: null
      }
    }
  )),
  on(OrganizationActions.getOrganizationUserAreasSuccess, (state, { userAreas }) => (
    {
      ...state,
      organizationUserAreas: {
        ...state.organizationUserAreas,
        areas: [...userAreas],
        loading: false,
        loaded: true
      }
    }
  )),
  on(OrganizationActions.getOrganizationUserAreasFail, (state, { payload }) => (
    {
      ...state,
      organizationUserAreas: {
        ...state.organizationUserAreas,
        areas: [],
        loading: false,
        loaded: false,
        error: { ...payload }
      }
    }
  )),
  on(OrganizationActions.clearSelectedOrganizationState, (state) => (
    {
      ...state,
      selectedOrganization: {
        ...initialSelectedOrganizationState
      }
    }
  ))
);

export function OrganizationReducer(state: SelectedOrganizationState | undefined, action: Action)
{
  return organizationReducer(state, action);
}