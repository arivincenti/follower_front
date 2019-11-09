import { createReducer, on, Action } from '@ngrx/store';
import * as OrganizationsActions from '../../actions/organizations/organizations.actions';
import { OrganizationModel } from '../../../models/organization.model';


export interface OrganizationsState
{
  organizations: OrganizationModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const initialState: OrganizationsState = {
  organizations: [],
  loading: false,
  loaded: false,
  error: null
}

export const organizationsReducer = createReducer(
  initialState,
  on(OrganizationsActions.getOrganizations, (state) => (
    {
      ...state,
      loading: true,
      error: null
    }
  )),
  on(OrganizationsActions.getOrganizationsSuccess, (state, { payload }) => (
    {
      ...state,
      organizations: [...payload],
      loading: false,
      loaded: true,
      error: null
    }
  )),
  on(OrganizationsActions.getOrganizationsFail, (state, { payload }) => (
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
      ...initialState
    }
  ))
);

export function OrganizationsReducer(state: OrganizationsState | undefined, action: Action)
{
  return organizationsReducer(state, action);
}