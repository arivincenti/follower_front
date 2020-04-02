import * as MemberActions from "../../../../../actions/userOrganizations/selectedOrganization/members/member/member.actions";
import { createReducer, on, Action } from "@ngrx/store";
import { MemberModel } from "../../../../../../models/member.model";

export interface MemberState {
  member: MemberModel;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const InitialStateMember: MemberState = {
  member: null,
  loading: true,
  loaded: false,
  error: null
};

export const memberReducer = createReducer(
  InitialStateMember,
  on(MemberActions.getMember, state => ({
    ...state,
    member: null,
    loading: true,
    loaded: false,
    error: null
  })),
  on(MemberActions.getMemberSuccess, (state, { payload }) => ({
    ...state,
    member: { ...payload },
    loading: false,
    loaded: true,
    error: null
  })),
  on(MemberActions.getMemberFail, (state, { payload }) => ({
    ...state,
    member: null,
    loading: false,
    loaded: false,
    error: { ...payload }
  })),
  on(MemberActions.createMember, state => ({
    ...state,
    member: { ...state.member },
    loading: true,
    loaded: false,
    error: null
  })),
  on(MemberActions.createMemberSuccess, (state, { member }) => ({
    ...state,
    member: { ...member },
    loading: false,
    loaded: true
  })),
  on(MemberActions.createMemberFail, (state, { payload }) => ({
    ...state,
    member: { ...state.member },
    loading: false,
    loaded: false,
    error: { ...payload }
  })),
  on(MemberActions.activateMember, state => ({
    ...state,
    member: { ...state.member },
    loading: true,
    loaded: false,
    error: null
  })),
  on(MemberActions.activateMemberSuccess, (state, { member }) => ({
    ...state,
    member: { ...member },
    loading: false,
    loaded: true
  })),
  on(MemberActions.activateMemberFail, (state, { payload }) => ({
    ...state,
    member: { ...state.member },
    loading: false,
    loaded: false,
    error: { ...payload }
  })),
  on(MemberActions.desactivateMember, state => ({
    ...state,
    member: { ...state.member },
    loading: true,
    loaded: false,
    error: null
  })),
  on(MemberActions.desactivateMemberSuccess, (state, { member }) => ({
    ...state,
    member: { ...member },
    loading: false,
    loaded: true
  })),
  on(MemberActions.desactivateMemberFail, (state, { payload }) => ({
    ...state,
    member: { ...state.member },
    loading: false,
    loaded: false,
    error: { ...payload }
  })),
  on(MemberActions.clearSelectedMemberState, state => ({
    ...state,
    ...InitialStateMember
  }))
);

export function MemberReducer(state: MemberState | undefined, action: Action) {
  return memberReducer(state, action);
}
