import { combineReducers } from "@ngrx/store";
import * as OrganizationReducer from "./organization/organization.reducer";
import * as AreasReducer from "./areas/areasIndex.reducer";
import * as MembersIndexReducer from "../selectedOrganization/members/membersIndex.reducer";

export interface state {
  organization: OrganizationReducer.OrganizationState;
  areas: AreasReducer.state;
  members: MembersIndexReducer.state;
}

export const initialState: state = {
  organization: OrganizationReducer.InitialStateOrganization,
  areas: AreasReducer.initialState,
  members: MembersIndexReducer.initialState
};

export const selectedOrganizationReducer = combineReducers({
  organization: OrganizationReducer.OrganizationReducer,
  areas: AreasReducer.AreasIndexReducer,
  members: MembersIndexReducer.MemberIndexReducer
});
