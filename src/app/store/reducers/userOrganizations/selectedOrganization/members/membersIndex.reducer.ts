import { combineReducers } from '@ngrx/store';
import * as MembersReducer from './members/members.reducer';
import * as MemberReducer from './member/member.reducer';
import * as MemberAreasReducer from './memberAreas/memberAreas.reducer';

export interface state
{
  members: MembersReducer.MembersState;
  memberAreas: MemberAreasReducer.MemberAreasState;
  selectedMember: MemberReducer.MemberState
}

export const initialState: state = {
  members: MembersReducer.InitialStateMembers,
  memberAreas: MemberAreasReducer.InitialStateMemberAreas,
  selectedMember: MemberReducer.InitialStateMember
};

export const MemberIndexReducer = combineReducers(
  {
    members: MembersReducer.MembersReducer,
    memberAreas: MemberAreasReducer.MemberAreasReducer,
    selectedMember: MemberReducer.MemberReducer
  },
  initialState
);