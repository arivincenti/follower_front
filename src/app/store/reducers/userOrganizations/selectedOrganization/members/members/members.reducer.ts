import * as MembersActions from '../../../../../actions/userOrganizations/selectedOrganization/members/members.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { MemberModel } from '../../../../../../models/member.model';


export interface MembersState
{
  members: MemberModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const InitialStateMembers = {
  members: [],
  loading: false,
  loaded: false,
  error: null
}

export const membersReducer = createReducer(
  InitialStateMembers,
  on(MembersActions.getMembers, (state) => (
    {
      ...state,
      members: [],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(MembersActions.getMembersSuccess, (state, { payload }) => (
    {
      ...state,
      members: [...payload],
      loading: false,
      loaded: true,
      error: null
    }
  )),
  on(MembersActions.getMembersFail, (state, { payload }) => (
    {
      ...state,
      members: [],
      loading: false,
      loaded: true,
      error: { ...payload }
    }
  )),
  on(MembersActions.createMember, (state) => (
    {
      ...state,
      members: [...state.members],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(MembersActions.createMemberSuccess, (state, { payload }) => (
    {
      ...state,
      members: [...state.members, { ...payload }],
      loading: false,
      loaded: true
    }
  )),
  on(MembersActions.createMemberFail, (state, { payload }) => (
    {
      ...state,
      members: [...state.members],
      loading: false,
      loaded: false,
      error: { ...payload }
    }
  )),
  // on(AreasActions.updateArea, (state) => (
  //   {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // )),
  // on(AreasActions.updateAreaSuccess, (state, { payload }) =>
  // {
  //   return {
  //     ...state,
  //     areas: [...state.areas.filter(area => area._id !== payload._id), { ...payload }],
  //     loading: false,
  //     loaded: true
  //   }
  // }
  // ),
  // on(AreasActions.updateAreaFail, (state, { payload }) => (
  //   {
  //     ...state,
  //     loading: false,
  //     loaded: false,
  //     error: { ...payload }
  //   }
  // )),
  // on(AreasActions.deleteArea, (state) => (
  //   {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // )),
  // on(AreasActions.deleteAreaSuccess, (state, { payload }) =>
  // {
  //   return {
  //     ...state,
  //     areas: [...state.areas.filter(area => area._id !== payload._id), { ...payload }],
  //     loading: false,
  //     loaded: true
  //   }
  // }
  // ),
  // on(AreasActions.deleteAreaFail, (state, { payload }) => (
  //   {
  //     ...state,
  //     loading: false,
  //     loaded: false,
  //     error: { ...payload }
  //   }
  // ))
);

export function MembersReducer(state: MembersState | undefined, action: Action)
{
  return membersReducer(state, action);
}