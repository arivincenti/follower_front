import { combineReducers } from "@ngrx/store";
import * as AreasReducer from "./areas/areas.reducer";
import * as MembersReducer from "./members/members.reducer";

export interface state {
  areas: AreasReducer.AreasState;
  members: MembersReducer.MembersState;
}

export const initialState: state = {
  areas: AreasReducer.InitialStateAreas,
  members: MembersReducer.InitialStateMembers,
};

export const organizationReducer = combineReducers({
  areas: AreasReducer.AreasReducer,
  members: MembersReducer.MembersReducer,
});
