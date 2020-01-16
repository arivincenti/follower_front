import * as OrganizationReducer from './selectedOrganization/selectedOrganization.reducer';
import * as OrganizationsReducer from './organizations/organizations.reducer';
import * as UserTicketsReducer from './userTickets/userTickets.reducer';
import { combineReducers } from '@ngrx/store';


export interface state
{
  organizations: OrganizationsReducer.OrganizationsState;
  selectedOrganization: OrganizationReducer.state;
  tickets: UserTicketsReducer.UserTicketsState
}

export const initialState: state = {
  organizations: OrganizationsReducer.initialOrganizationsState,
  selectedOrganization: OrganizationReducer.initialState,
  tickets: UserTicketsReducer.initialUserTicketsState
};

export const userOrganizationReducer = combineReducers(
  {
    organizations: OrganizationsReducer.OrganizationsReducer,
    selectedOrganization: OrganizationReducer.selectedOrganizationReducer,
    tickets: UserTicketsReducer.UserTicketsReducer
  },
  initialState
);