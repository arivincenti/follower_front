import * as OrganizationReducer from "./organization/organization.reducer";
import * as OrganizationsReducer from "./organizations/organizations.reducer";
import * as TicketsReducer from "./tickets/tickets.reducer";
import * as NotificationsReducer from "./notifications/notifications.reducer";
import { combineReducers } from "@ngrx/store";

export interface state {
  organizations: OrganizationsReducer.OrganizationsState;
  organization: OrganizationReducer.state;
  tickets: TicketsReducer.state;
  notifications: NotificationsReducer.NotificationsState;
}

export const initialState: state = {
  organizations: OrganizationsReducer.initialOrganizationsState,
  organization: OrganizationReducer.initialState,
  tickets: TicketsReducer.initialState,
  notifications: NotificationsReducer.initialNotificationsState,
};

export const userOrganizationReducer = combineReducers({
  organizations: OrganizationsReducer.OrganizationsReducer,
  organization: OrganizationReducer.organizationReducer,
  tickets: TicketsReducer.TicketReducer,
  notifications: NotificationsReducer.NotificationsReducer,
});
