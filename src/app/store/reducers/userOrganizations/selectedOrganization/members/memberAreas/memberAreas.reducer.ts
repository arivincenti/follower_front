import * as MemberAreasActions from '../../../../../actions/userOrganizations/selectedOrganization/members/memberAreas/memberAreas.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { AreaModel } from 'src/app/models/area.model';


export interface MemberAreasState
{
  areas: AreaModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const InitialStateMemberAreas: MemberAreasState = {
  areas: [],
  loading: false,
  loaded: false,
  error: null
}

export const memberAreasReducer = createReducer(
  InitialStateMemberAreas,
  on(MemberAreasActions.getMemberAreas, (state) => (
    {
      ...state,
      areas: [],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(MemberAreasActions.getMemberAreasSuccess, (state, { payload }) => (
    {
      ...state,
      areas: [...payload],
      loading: false,
      loaded: true,
      error: null
    }
  )),
  on(MemberAreasActions.getMemberAreasFail, (state, { payload }) => (
    {
      ...state,
      areas: [],
      loading: false,
      loaded: true,
      error: { ...payload }
    }
  ))
);

export function MemberAreasReducer(state: MemberAreasState | undefined, action: Action)
{
  return memberAreasReducer(state, action);
}