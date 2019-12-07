import { AreaModel } from 'src/app/models/area.model';
import * as UserAreasActions from '../../../../actions/userOrganizations/selectedOrganization/areas/userAreas.actions';
import { createReducer, Action, on } from '@ngrx/store';

export interface UserAreasState
{
  areas: AreaModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const InitialStateUserAreas: UserAreasState = {
  areas: [],
  loading: false,
  loaded: false,
  error: null
}


export const userAreasReducer = createReducer(
  InitialStateUserAreas,
  on(UserAreasActions.getUserAreas, (state) => (
    {
      ...state,
      areas: [],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(UserAreasActions.getUserAreasSuccess, (state, { payload }) => (
    {
      ...state,
      areas: [...payload],
      loading: false,
      loaded: true
    }

  )),
  on(UserAreasActions.getUserAreasFail, (state, { payload }) => (
    {
      ...state,
      areas: [],
      loading: false,
      loaded: false,
      error: { ...payload }
    }
  ))
);

export function UserAreasReducer(state: UserAreasState | undefined, action: Action)
{
  return userAreasReducer(state, action);
}