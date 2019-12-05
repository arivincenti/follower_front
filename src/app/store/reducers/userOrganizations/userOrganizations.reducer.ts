import * as OrganizationReducer from './selectedOrganization/selectedOrganization.reducer';
import * as OrganizationsReducer from './organizations/organizations.reducer';
import { combineReducers } from '@ngrx/store';


export interface state
{
  organizations: OrganizationsReducer.OrganizationsState;
  selectedOrganization: OrganizationReducer.state;
}

export const initialState: state = {
  organizations: OrganizationsReducer.initialOrganizationsState,
  selectedOrganization: OrganizationReducer.initialState,
};

export const userOrganizationReducer = combineReducers(
  {
    organizations: OrganizationsReducer.OrganizationsReducer,
    selectedOrganization: OrganizationReducer.selectedOrganizationReducer
  },
  initialState
);