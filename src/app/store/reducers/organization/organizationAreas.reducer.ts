import { createReducer, on, Action } from '@ngrx/store';
import * as OrganizationAreasActions from '../../actions/organization/organizationAreas.actions';
import { AreaModel } from 'src/app/models/area.model';

export interface OrganizationAreasState
{
  areas: AreaModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const initialState: OrganizationAreasState = {
  areas: [],
  loading: false,
  loaded: false,
  error: null
}

export const organizationAreasReducer = createReducer(
  initialState,
  on(OrganizationAreasActions.getOrganizationAreas, (state) => (
    {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(OrganizationAreasActions.getOrganizationAreasSuccess, (state, { areas }) => (
    {
      ...state,
      areas: [...areas],
      loading: false,
      loaded: true
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
  on(OrganizationAreasActions.clearState, (state) => (
    {
      ...state,
      ...initialState
    }
  ))
)

export function OrganizationAreasReducer(state: OrganizationAreasState | undefined, action: Action)
{
  return organizationAreasReducer(state, action);
}