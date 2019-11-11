import { createReducer, on, Action } from '@ngrx/store';
import { OrganizationModel } from 'src/app/models/organization.model';
import * as OrganizationActions from '../../actions/organization/organization.actions';
import * as OrganizationAreasReducer from '../../reducers/organization/organizationAreas.reducer';
import { AreaModel } from 'src/app/models/area.model';

export interface OrganizationState
{
  organization: OrganizationModel,
  organizationAreas: OrganizationAreas,
  organizationUserAreas: OrganizationUserAreas,
  loading: boolean,
  loaded: boolean,
  error: any
}

export interface OrganizationAreas
{
  organizationAreas: AreaModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const InitialStateOrganizationAreas = {
  organizationAreas: [],
  loading: false,
  loaded: false,
  error: null
}

export interface OrganizationUserAreas
{
  organizationUserAreas: AreaModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const InitialStateOrganizationUserAreas = {
  organizationUserAreas: [],
  loading: false,
  loaded: false,
  error: null
}

export const initialState: OrganizationState = {
  organization: null,
  organizationAreas: InitialStateOrganizationAreas,
  organizationUserAreas: InitialStateOrganizationUserAreas,
  loading: false,
  loaded: false,
  error: null
}

export const organizationReducer = createReducer(
  initialState,
  on(OrganizationActions.getOrganization, (state) => (
    {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(OrganizationActions.getOrganizationSuccess, (state, { payload }) => (
    {
      ...state,
      organization: { ...payload },
      loading: false,
      loaded: true
    }
  )),
  on(OrganizationActions.getOrganizationFail, (state, { payload }) => (
    {
      ...state,
      organization: null,
      loading: false,
      loaded: true,
      error: { ...payload }
    }
  )),
  on(OrganizationActions.deleteOrganization, (state) => (
    {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(OrganizationActions.deleteOrganizationSuccess, (state, { organization }) => (
    {
      ...state,
      organization: { ...organization },
      loading: false,
      loaded: true,
      error: null

    }
  )),
  on(OrganizationActions.deleteOrganizationFail, (state, { payload }) => (
    {
      ...state,
      loading: false,
      loaded: true,
      error: { ...payload }
    }
  )),
  on(OrganizationActions.getOrganizationAreas, (state) => (
    {
      ...state,
      organizationAreas: {
        ...state.organizationAreas,
        loading: true,
      loaded: false,
      },
    }
  )),
  on(OrganizationActions.getOrganizationAreasSuccess, (state, { areas }) => (
    {
      ...state,
      organizationAreas: {
        ...state.organizationAreas,
        organizationAreas: [...areas],
        loading: false,
        loaded: true
      }
    }
  )),
  on(OrganizationActions.getOrganizationAreasFail, (state, { payload }) => (
    {
      ...state,
      organizationAreas: {
        ...state.organizationAreas,
        organizationAreas: [],
        loading: false,
        loaded: false,
        error: {payload}
      }
    }
  )),
  on(OrganizationActions.getOrganizationUserAreas, (state) => (
    {
      ...state,
      organizationUserAreas: {
        ...state.organizationUserAreas,
        loading: true,
        loaded: false,
      }
    }
  )),
  on(OrganizationActions.getOrganizationUserAreasSuccess, (state, { userAreas }) => (
    {
      ...state,
      organizationUserAreas: {
        ...state.organizationUserAreas,
        organizationUserAreas: [...userAreas],
        loading: false,
        loaded: true,
      }
    }
  )),
  on(OrganizationActions.getOrganizationUserAreasFail, (state, { payload }) => (
    {
      ...state,
      organizationUserAreas: {
        ...state.organizationUserAreas,
        organizationUserAreas: [],
        loading: false,
        loaded: false,
        error: {...payload}
      }
    }
  )),
  on(OrganizationActions.clearState, (state) => (
    {
      ...state,
      ...initialState
    }
  ))
)

export function OrganizationReducer(state: OrganizationState | undefined, action: Action)
{
  return organizationReducer(state, action);
}