import * as OrganizationReducer from "./selectedOrganization/selectedOrganization.reducer";
import * as OrganizationsReducer from "./organizations/organizations.reducer";
import * as TicketsReducer from "./tickets/ticket.reducer";
import * as NotificationsReducer from "./notifications/notifications.reducer";
import { combineReducers } from "@ngrx/store";

export interface state {
  organizations: OrganizationsReducer.OrganizationsState;
  selectedOrganization: OrganizationReducer.state;
  tickets: TicketsReducer.state;
  notifications: NotificationsReducer.NotificationsState;
}

export const initialState: state = {
  organizations: OrganizationsReducer.initialOrganizationsState,
  selectedOrganization: OrganizationReducer.initialState,
  tickets: TicketsReducer.initialState,
  notifications: NotificationsReducer.initialNotificationsState
};

export const userOrganizationReducer = combineReducers({
  organizations: OrganizationsReducer.OrganizationsReducer,
  selectedOrganization: OrganizationReducer.selectedOrganizationReducer,
  tickets: TicketsReducer.TicketReducer,
  notifications: NotificationsReducer.NotificationsReducer
});
