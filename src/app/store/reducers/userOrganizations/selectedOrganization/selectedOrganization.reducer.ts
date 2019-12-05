import { combineReducers } from '@ngrx/store';
import * as OrganizationReducer from '../selectedOrganization/organization.reducer';
import * as OrganizationAreasReducer from '../selectedOrganization/organizationAreas.reducer';
import * as OrganizationUserAreasReducer from '../selectedOrganization/organizationUserAreas.reducer';

export interface state
{
  organization: OrganizationReducer.OrganizationState;
  organizationAreas: OrganizationAreasReducer.OrganizationAreasState
  organizationUserAreas: OrganizationUserAreasReducer.OrganizationUserAreas;
}

export const initialState: state = {
  organization: OrganizationReducer.InitialStateOrganization,
  organizationAreas: OrganizationAreasReducer.InitialStateOrganizationAreas,
  organizationUserAreas: OrganizationUserAreasReducer.InitialStateOrganizationUserAreas,
};

export const selectedOrganizationReducer = combineReducers(
  {
    organization: OrganizationReducer.OrganizationReducer,
    organizationAreas: OrganizationAreasReducer.OrganizationAreasReducer,
    organizationUserAreas: OrganizationUserAreasReducer.OrganizationUserAreasReducer,
  },
  initialState
);