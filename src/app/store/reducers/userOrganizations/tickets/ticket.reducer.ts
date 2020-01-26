import { combineReducers } from '@ngrx/store';
import * as UserTicketReducer from './userTickets/userTickets.reducer';
import * as AreaTicketReducer from './areaTickets/areaTickets.reducer';

export interface state
{
  userTickets: UserTicketReducer.UserTicketsState,
  areaTickets: AreaTicketReducer.AreaTicketsState
}

export const initialState: state = {
  userTickets: UserTicketReducer.initialUserTicketsState,
  areaTickets: AreaTicketReducer.initialAreaTicketsState
};

export const TicketReducer = combineReducers(
  {
    userTickets: UserTicketReducer.UserTicketsReducer,
    areaTickets: AreaTicketReducer.AreaTicketsReducer
  },
  initialState
);