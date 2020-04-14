import * as MembersActions from "../../../../actions/userOrganizations/selectedOrganization/members/members.actions";
import { createReducer, on, Action } from "@ngrx/store";
import { MemberModel } from "../../../../../models/member.model";

export interface MembersState {
  members: MemberModel[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const InitialStateMembers = {
  members: [],
  loading: false,
  loaded: false,
  error: null,
};

export const membersReducer = createReducer(
  InitialStateMembers,
  on(MembersActions.getMembers, (state) => ({
    ...state,
    members: [],
    loading: true,
    loaded: false,
    error: null,
  })),
  on(MembersActions.getMembersSuccess, (state, { payload }) => ({
    ...state,
    members: [...payload],
    loading: false,
    loaded: true,
    error: null,
  })),
  on(MembersActions.getMembersFail, (state, { payload }) => ({
    ...state,
    members: [],
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(MembersActions.createMember, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(MembersActions.createMemberSuccess, (state, { member }) => ({
    ...state,
    members: [...state.members, { ...member }],
    loading: false,
    loaded: true,
  })),
  on(MembersActions.createMemberFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(MembersActions.activateMember, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(MembersActions.activateMemberSuccess, (state, { member }) => {
    var index = state.members.findIndex((data) => data._id === member._id);
    state.members.splice(index, 1, { ...member });
    return {
      ...state,
      members: [...state.members],
      loading: false,
      loaded: true,
    };
  }),
  on(MembersActions.activateMemberFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(MembersActions.desactivateMember, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(MembersActions.desactivateMemberSuccess, (state, { member }) => {
    var index = state.members.findIndex((data) => data._id === member._id);
    state.members.splice(index, 1, { ...member });
    return {
      ...state,
      members: [...state.members],
      loading: false,
      loaded: true,
    };
  }),
  on(MembersActions.desactivateMemberFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(MembersActions.addCreatedMemberToList, (state, { member }) => ({
    ...state,
    members: [...state.members, { ...member }],
    loading: false,
    loaded: false,
    error: null,
  })),
  on(MembersActions.updateMemberList, (state, { member }) => {
    var index = state.members.findIndex((data) => data._id === member._id);
    state.members.splice(index, 1, { ...member });
    return {
      ...state,
      members: [...state.members],
      loading: false,
      loaded: true,
    };
  })
);

export function MembersReducer(
  state: MembersState | undefined,
  action: Action
) {
  return membersReducer(state, action);
}
