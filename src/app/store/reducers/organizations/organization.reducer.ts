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

export interface OrganizationAreas
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
        areas: [],
        loading: true,
        loaded: false,
        error: null
      }
    }
  )),
  on(OrganizationActions.getOrganizationAreasSuccess, (state, { payload }) => (
    {
      ...state,
      organizationAreas: {
        ...state.organizationAreas,
        areas: [...payload],
        loading: false,
        loaded: true,
        error: null
      }
    }
  )),
  on(OrganizationActions.getOrganizationAreasFail, (state, { payload }) => (
    {
      ...state,
      organizationAreas: {
        ...state.organizationAreas,
        areas: [],
        loading: false,
        loaded: true,
        error: { ...payload }
      }
    }
  )),
  on(OrganizationActions.createOrganizationArea, (state) => (
    {
      ...state,
      organizationAreas: {
        ...state.organizationAreas,
        areas: [...state.organizationAreas.areas],
        loading: true,
        loaded: false,
        error: null
      }
    }
  )),
  on(OrganizationActions.createOrganizationAreaSuccess, (state, { payload }) => (
    {
      ...state,
      organizationAreas: {
        ...state.organizationAreas,
        areas: [...state.organizationAreas.areas, { ...payload }],
        loading: false,
        loaded: true
      }
    }
  )),
  on(OrganizationActions.createOrganizationAreaFail, (state, { payload }) => (
    {
      ...state,
      organizationAreas: {
        ...state.organizationAreas,
        areas: [...state.organizationAreas.areas],
        loading: false,
        loaded: false,
        error: { ...payload }
      }
    }
  )),
  on(OrganizationActions.updateOrganizationArea, (state) => (
    {
      ...state,
      organizationAreas: {
        ...state.organizationAreas,
        areas: [...state.organizationAreas.areas],
        loading: true,
        loaded: false,
        error: null
      }
    }
  )),
  on(OrganizationActions.updateOrganizationAreaSuccess, (state, { payload }) => 
  {
    return {
      ...state,
      organizationAreas: {
        ...state.organizationAreas,
        areas: [...state.organizationAreas.areas.filter(area => area._id !== payload._id), { ...payload }],
        loading: false,
        loaded: true
      }
    }
  }
  ),
  on(OrganizationActions.updateOrganizationAreaFail, (state, { payload }) => (
    {
      ...state,
      organizationAreas: {
        ...state.organizationAreas,
        areas: [...state.organizationAreas.areas],
        loading: false,
        loaded: false,
        error: { ...payload }
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
  on(OrganizationActions.getOrganizationUserAreasSuccess, (state, { payload }) => (
    {
      ...state,
      organizationUserAreas: {
        ...state.organizationUserAreas,
        areas: [...payload],
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
      ...initialSelectedOrganizationState
    }
  ))
);

export function OrganizationReducer(state: SelectedOrganizationState | undefined, action: Action)
{
  return organizationReducer(state, action);
}