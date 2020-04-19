import { combineReducers } from "@ngrx/store";
import * as AreasReducer from "./areas/areas.reducer";
import * as AreaReducer from "./area/area.reducer";
import * as MemberReducer from "./member/member.reducer";
import * as MembersReducer from "./members/members.reducer";
import * as OrganizationReducer from "./organization/organization.reducer";

export interface state {
  organization: OrganizationReducer.organizationState;
  areas: AreasReducer.AreasState;
  area: AreaReducer.AreaState;
  member: MemberReducer.MemberState;
  members: MembersReducer.MembersState;
}

export const initialState: state = {
  organization: OrganizationReducer.initialStateOrganization,
  areas: AreasReducer.InitialStateAreas,
  area: AreaReducer.InitialStateArea,
  member: MemberReducer.InitialStateMember,
  members: MembersReducer.InitialStateMembers,
};

export const indexOrganizationReducer = combineReducers({
  organization: OrganizationReducer.OrganizationReducer,
  areas: AreasReducer.AreasReducer,
  area: AreaReducer.AreaReducer,
  member: MemberReducer.MemberReducer,
  members: MembersReducer.MembersReducer,
});
