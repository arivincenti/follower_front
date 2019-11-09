import { createReducer, on, Action } from '@ngrx/store';
import { OrganizationModel } from 'src/app/models/organization.model';
import * as OrganizationActions from '../../actions/organization/organization.actions';

export interface OrganizationState
{
  organization: OrganizationModel,
  loading: boolean,
  loaded: boolean,
  error: any
}

export const initialState: OrganizationState = {
  organization: null,
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
      organization: {...payload},
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
  on(OrganizationActions.createOrganization, (state) => (
    {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(OrganizationActions.createOrganizationSuccess, (state, { payload }) => (
    {
      ...state,
      organization: { ...payload },
      loading: false,
      loaded: true,
      error: null
    }
  )),
  on(OrganizationActions.createOrganizationFail, (state, { payload }) => (
    {
      ...state,
      loading: false,
      loaded: true,
      error: { ...payload }
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