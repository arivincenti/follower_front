import { MemberModel } from "src/app/models/member.model";
import { on, createReducer, Action } from "@ngrx/store";
import * as MemberActions from "@actions/member";

export interface MemberState {
  member: MemberModel;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const InitialStateMember = {
  member: null,
  loading: false,
  loaded: false,
  error: null,
};

export const memberReducer = createReducer(
  InitialStateMember,
  on(MemberActions.getMember, (state) => ({
    member: { ...state.member },
    loading: true,
    loaded: false,
    error: null,
  })),
  on(MemberActions.getMemberSuccess, (state, { member }) => ({
    member: { ...member },
    loading: false,
    loaded: true,
    error: null,
  })),
  on(MemberActions.getMember, (state, { payload }) => ({
    member: { ...state.member },
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(MemberActions.createMember, (state) => ({
    member: { ...state.member },
    loading: true,
    loaded: false,
    error: null,
  })),
  on(MemberActions.createMemberSuccess, (state, { member }) => ({
    member: { ...member },
    loading: false,
    loaded: true,
    error: null,
  })),
  on(MemberActions.createMemberFail, (state, { payload }) => ({
    member: { ...state.member },
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(MemberActions.activateMember, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(MemberActions.activateMemberSuccess, (state, { member }) => ({
    member: { ...member },
    loading: false,
    loaded: false,
    error: null,
  })),
  on(MemberActions.activateMemberFail, (state, { payload }) => ({
    member: { ...state.member },
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(MemberActions.desactivateMember, (state) => ({
    member: { ...state.member },
    loading: true,
    loaded: false,
    error: null,
  })),
  on(MemberActions.desactivateMemberSuccess, (state, { member }) => ({
    member: { ...member },
    loading: false,
    loaded: false,
    error: null,
  })),
  on(MemberActions.desactivateMemberFail, (state, { payload }) => ({
    member: { ...state.member },
    loading: false,
    loaded: false,
    error: { ...payload },
  }))
);

export function MemberReducer(state: MemberState | undefined, action: Action) {
  return memberReducer(state, action);
}
