import { combineReducers } from '@ngrx/store';
import * as OrganizationReducer from './organization/organization.reducer';
import * as AreasReducer from './areas/areas.reducer';
import * as UserAreasReducer from './areas/userAreas.reducer';

export interface state
{
  organization: OrganizationReducer.OrganizationState;
  areas: AreasReducer.AreasState
  userAreas: UserAreasReducer.UserAreas;
}

export const initialState: state = {
  organization: OrganizationReducer.InitialStateOrganization,
  areas: AreasReducer.InitialStateAreas,
  userAreas: UserAreasReducer.InitialStateUserAreas,
};

export const selectedOrganizationReducer = combineReducers(
  {
    organization: OrganizationReducer.OrganizationReducer,
    areas: AreasReducer.AreasReducer,
    userAreas: UserAreasReducer.UserAreasReducer,
  },
  initialState
);