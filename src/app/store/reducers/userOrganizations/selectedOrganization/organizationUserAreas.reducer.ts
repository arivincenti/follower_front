import { AreaModel } from 'src/app/models/area.model';
import * as OrganizationUserAreasActions from '../../../actions/userOrganizations/selectedOrganization/organizationUserAreas.actions';
import { createReducer, Action, on } from '@ngrx/store';

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


export const organizationUserAreasReducer = createReducer(
  InitialStateOrganizationUserAreas,
  on(OrganizationUserAreasActions.getOrganizationUserAreas, (state) => (
    {
      ...state,
      areas: [],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(OrganizationUserAreasActions.getOrganizationUserAreasSuccess, (state, { payload }) => (
    {
      ...state,
      areas: [...payload],
      loading: false,
      loaded: true
    }

  )),
  on(OrganizationUserAreasActions.getOrganizationUserAreasFail, (state, { payload }) => (
    {
      ...state,
      areas: [],
      loading: false,
      loaded: false,
      error: { ...payload }
    }

  ))
);

export function OrganizationUserAreasReducer(state: OrganizationUserAreas | undefined, action: Action)
{
  return organizationUserAreasReducer(state, action);
}