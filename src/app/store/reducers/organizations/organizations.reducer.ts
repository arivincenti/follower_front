import { createReducer, on, Action, ActionReducer, combineReducers } from '@ngrx/store';
import * as OrganizationsActions from '../../actions/organizations/organizations.actions';
import { OrganizationModel } from '../../../models/organization.model';


export interface OrganizationsState
{
  organizations: OrganizationModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const initialOrganizationsState: OrganizationsState = {
  organizations: [],
  loading: false,
  loaded: false,
  error: null
}

export const organizationsReducer = createReducer(
  initialOrganizationsState,
  on(OrganizationsActions.getUserOrganizations, (state) => (
    {
      ...state,
      organizations: [],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(OrganizationsActions.getUserOrganizationsSuccess, (state, { payload }) => (
    {
      ...state,
      organizations: [...payload],
      loading: false,
      loaded: true
    }
  )),
  on(OrganizationsActions.getUserOrganizationsFail, (state, { payload }) => (
    {
      ...state,
      organizations: [],
      loading: false,
      loaded: false,
      error: { payload }
    }
  )),
  on(OrganizationsActions.createOrganization, (state) => (
    {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(OrganizationsActions.createOrganizationSuccess, (state, { organization }) => (
    {
      ...state,
      organizations: [...state.organizations, { ...organization }],
      loading: false,
      loaded: true
    }
  )),
  on(OrganizationsActions.createOrganizationFail, (state, { payload }) => (
    {
      ...state,
      loading: false,
      loaded: false,
      error: { ...payload }
    }
  )),
  on(OrganizationsActions.updateOrganization, (state) => (
    {
      ...state,
      loading: false,
      loaded: false,
      error: null
    }
  )),
  on(OrganizationsActions.updateOrganizationSuccess, (state, { organization }) =>
  {
    return {
      ...state,
      organizations: [...state.organizations.filter(data => data._id !== organization._id), { ...organization }],
      loading: false,
      loaded: true
    }
  }),
  on(OrganizationsActions.updateOrganizationFail, (state, { payload }) => (
    {
      ...state,
      loading: false,
      loaded: false,
      error: { ...payload }
    }
  )),
  on(OrganizationsActions.deleteOrganization, (state) => (
    {
      ...state,
      loading: false,
      loaded: false,
      error: null
    }
  )),
  on(OrganizationsActions.deleteOrganizationSuccess, (state, { organization }) =>
  {
    return {
      ...state,
      organizations: [...state.organizations.filter(data => data._id !== organization._id), { ...organization }],
      loading: false,
      loaded: true
    }
  }),
  on(OrganizationsActions.deleteOrganizationFail, (state, { payload }) => (
    {
      ...state,
      loading: false,
      loaded: false,
      error: { ...payload }
    }
  )),
  on(OrganizationsActions.clearState, (state) => (
    {
      ...state,
      ...initialOrganizationsState
    }
  ))
);


export function OrganizationsReducer(state: OrganizationsState | undefined, action: Action)
{
  return organizationsReducer(state, action);
}