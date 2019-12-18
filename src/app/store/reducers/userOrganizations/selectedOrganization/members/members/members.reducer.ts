import * as MembersActions from '../../../../../actions/userOrganizations/selectedOrganization/members/members/members.actions';
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
  on(MembersActions.updateMember, (state) => (
    {
      ...state,
      members: [...state.members],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(MembersActions.updateMemberSuccess, (state, { payload }) =>
  {
    var index = state.members.findIndex(data => data._id === payload._id);
    state.members.splice(index, 1, { ...payload });

    return {
      ...state,
      members: [...state.members],
      loading: false,
      loaded: true
    }
  }),
  on(MembersActions.updateMemberFail, (state, { payload }) => (
    {
      ...state,
      members: [...state.members],
      loading: false,
      loaded: false,
      error: { ...payload }
    }
  )),
  on(MembersActions.inactiveMember, (state) => (
    {
      ...state,
      members: [...state.members],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(MembersActions.inactiveMemberSuccess, (state, { payload }) =>
  {
    var index = state.members.findIndex(data => data._id === payload._id);
    state.members.splice(index, 1, { ...payload });

    return {
      ...state,
      members: [...state.members],
      loading: false,
      loaded: true
    }
  }),
  on(MembersActions.inactiveMemberFail, (state, { payload }) => (
    {
      ...state,
      members: [...state.members],
      loading: false,
      loaded: false,
      error: { ...payload }
    }
  )),
);

export function MembersReducer(state: MembersState | undefined, action: Action)
{
  return membersReducer(state, action);
}