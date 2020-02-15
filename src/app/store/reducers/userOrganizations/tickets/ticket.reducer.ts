import { combineReducers } from "@ngrx/store";
import * as UserTicketReducer from "./userTickets/userTickets.reducer";
import * as AreaTicketReducer from "./areaTickets/areaTickets.reducer";
import * as SelectedTicketReducer from "./ticket/selectedTicket.reducer";

export interface state {
  userTickets: UserTicketReducer.UserTicketsState;
  areaTickets: AreaTicketReducer.AreaTicketsState;
  selectedTicket: SelectedTicketReducer.state;
}

export const initialState: state = {
  userTickets: UserTicketReducer.initialUserTicketsState,
  areaTickets: AreaTicketReducer.initialAreaTicketsState,
  selectedTicket: SelectedTicketReducer.initialState
};

export const TicketReducer = combineReducers(
  {
    userTickets: UserTicketReducer.UserTicketsReducer,
    areaTickets: AreaTicketReducer.AreaTicketsReducer,
    selectedTicket: SelectedTicketReducer.SelectedTicketReducer
  },
  initialState
);
