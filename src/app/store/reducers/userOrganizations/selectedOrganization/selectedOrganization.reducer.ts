import { combineReducers } from '@ngrx/store';
import * as OrganizationReducer from './organization/organization.reducer';
import * as AreasReducer from './areas/areas.reducer';
import * as UserAreasReducer from './areas/userAreas.reducer';
import * as MembersIndexReducer from '../selectedOrganization/members/membersIndex.reducer';

export interface state
{
  organization: OrganizationReducer.OrganizationState;
  areas: AreasReducer.AreasState
  userAreas: UserAreasReducer.UserAreasState;
  members: MembersIndexReducer.state;
}

export const initialState: state = {
  organization: OrganizationReducer.InitialStateOrganization,
  areas: AreasReducer.InitialStateAreas,
  userAreas: UserAreasReducer.InitialStateUserAreas,
  members: MembersIndexReducer.initialState
};

export const selectedOrganizationReducer = combineReducers(
  {
    organization: OrganizationReducer.OrganizationReducer,
    areas: AreasReducer.AreasReducer,
    userAreas: UserAreasReducer.UserAreasReducer,
    members: MembersIndexReducer.memberIndexReducer
  },
  initialState
);