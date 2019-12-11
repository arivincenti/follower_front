import { combineReducers } from '@ngrx/store';
import * as MembersReducer from './members/members.reducer';
import * as MemberReducer from './member/member.reducer';

export interface state
{
  members: MembersReducer.MembersState;
  selectedMember: MemberReducer.MemberState
}

export const initialState: state = {
  members: MembersReducer.InitialStateMembers,
  selectedMember: MemberReducer.InitialStateMember
};

export const memberIndexReducer = combineReducers(
  {
    members: MembersReducer.MembersReducer,
    selectedMember: MemberReducer.MemberReducer
  },
  initialState
);