import * as AreaMembersActions from '../../../../../../actions/userOrganizations/selectedOrganization/areas/area/areaMembers/areaMembers.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { MemberModel } from 'src/app/models/member.model';


export interface AreaMembersState
{
  members: MemberModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const InitialStateAreaMembers: AreaMembersState = {
  members: [],
  loading: false,
  loaded: false,
  error: null
}

export const areaMembersReducer = createReducer(
  InitialStateAreaMembers,
  on(AreaMembersActions.getAreaMembers, (state) => (
    {
      ...state,
      members: [],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(AreaMembersActions.getAreaMembersSuccess, (state, { payload }) => (
    {
      ...state,
      members: [...payload],
      loading: false,
      loaded: true,
      error: null
    }
  )),
  on(AreaMembersActions.getAreaMembersFail, (state, { payload }) => (
    {
      ...state,
      members: [],
      loading: false,
      loaded: true,
      error: { ...payload }
    }
  ))
);

export function AreaMembersReducer(state: AreaMembersState | undefined, action: Action)
{
  return areaMembersReducer(state, action);
}