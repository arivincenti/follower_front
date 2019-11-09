import { createReducer, on, Action } from '@ngrx/store';
import * as OrganizationUserAreasActions from '../../actions/organization/organizationUserAreas.actions';
import { AreaModel } from 'src/app/models/area.model';

export interface OrganizationUserAreasState
{
  areas: AreaModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const initialState: OrganizationUserAreasState = {
  areas: [],
  loading: false,
  loaded: false,
  error: null
}

export const organizationUserAreasReducer = createReducer(
  initialState,
  on(OrganizationUserAreasActions.getOrganizationUserAreas, (state) => (
    {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(OrganizationUserAreasActions.getOrganizationUserAreasSuccess, (state, { userAreas }) => (
    {
      ...state,
      areas: [...userAreas],
      loading: false,
      loaded: true
    }
  )),
  on(OrganizationUserAreasActions.getOrganizationUserAreasFail, (state, { payload }) => (
    {
      ...state,
      areas: [],
      loading: false,
      loaded: true,
      error: { ...payload }
    }
  )),
  on(OrganizationUserAreasActions.clearState, (state) => (
    {
      ...state,
      ...initialState
    }
  ))
)

export function OrganizationUserAreasReducer(state: OrganizationUserAreasState | undefined, action: Action)
{
  return organizationUserAreasReducer(state, action);
}